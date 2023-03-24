import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreService } from 'src/app/core/services/core.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.scss']
})
export class AllNotificationsComponent implements OnInit {

  offer$!: Observable<any>;
  question$!: Observable<any>;
  notification$!: Observable<any>;
  @Output() notificationSelected: EventEmitter<string> = new EventEmitter<string>();

  offer: any = [];

  @Input() chatList!: any;
  @Input() empty!: any;

  chatSelected = '';
  chatType!: number;
  message = '';
  receiver = '';
  title = '';
  snippet = '';

  seller = false;

  initialSender!: string;
  colorSender!: string;
  initialReceiver!: string;
  colorReceiver = 'receiver';

  details = false;

  // Question variables
  repplyActive = false;
  emailError = '';
  phoneError = '';
  questionForm = new FormGroup({
    replyQuestion: new FormControl('', [Validators.required])
  });
  get replyQuestion(): FormControl { return this.questionForm.get('replyQuestion') as FormControl; }

  // Offer variables
  counteroffer = false;
  offerForm = new FormGroup({
    counterOffer: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
    offerMessage: new FormControl('')
  });
  get offerMessage(): FormControl { return this.offerForm.get('offerMessage') as FormControl; }
  get counterOffer(): FormControl { return this.offerForm.get('counterOffer') as FormControl; }

  constructor(
    private router: Router,
    private coreService: CoreService,
    private alertService: AlertService,
    private communicationService: CommunicationService,
  ) { }

  public screenWidth: any;
  public screenHeight: any;

  ngOnInit(): void {
  }

  setCrumb(event: any): void {
    this.notificationSelected.emit(event);
  }

  openChat(id: string, type: number, sender: string, receiver: string, senderSeen: any, notID: string, seller: boolean): void {
    this.seller = seller;
    this.counteroffer = false;
    if (window.innerWidth <= 600) {
      this.details = true;
    }

    this.chatSelected = id;
    this.chatType = type;

    this.initialSender = sender[0];
    this.colorSender = id[0];
    this.initialReceiver = receiver[0];

    switch (type) {
      case 1: {
        (!senderSeen) ? this.markOfferAsSeen(notID, id) : this.getOfferDetails(id);
        break;
      }
      case 2: {
        (!senderSeen) ? this.markQuestionAsSeen(id) : this.getQuestionDetails(id);
        break;
      }
      case 3: {
        (!senderSeen) ? this.markNotificationasSeen(id) : this.getNotificationDetails(id);
        break;
      }
      default: {
        break;
      }
    }
  }

  goTo(id: string): void {
     this.router.navigate([`product/detail/` + id]);
  }

  // Offer functions
  getOfferDetails(id: string): void {
    this.offer$ = this.communicationService.getOfferDetails(id).pipe(
      map(res => {
        this.offer = res.data;
        this.remainingDays();
        return res.data;
      }
    ));
  }

  showOfferbuttons(offer: any): boolean {
    if (this.seller) {
      return (offer.status !== 2);
    } else { // Buyer
      return (offer.status === 2); // Counter Offer
    }
  }

  remainingDays(): string {
    const days = 86400000;
    const created = new Date(this.offer.created_date).getTime();
    const today = Date.now();
    const aux = Number(7 - (today - created) / days);
    return (aux <= 0) ? '0' : aux.toFixed(0);
  }

  change(): void {
    this.counteroffer = !this.counteroffer;
    this.counterOffer.reset();
  }

  sendCounterOfferLogic(reply: number): void {
    let data = { };
    if (reply === 0) { // Accepted
      if (this.offer.status === 2) {
        data = {
          chat_forum_id: this.offer.id, // FORUM ID!
          action: reply,
          offer: this.offer.counter_offer,
        };
      } else {
        data = {
          chat_forum_id: this.offer.id, // FORUM ID!
          action: reply,
          offer: this.offer.offer,
        };
      }
      this.sendCounterOffer(data);
    } else {
      if (reply === 1) { // Rejected
        data = {
          chat_forum_id: this.offer.id, // FORUM ID!
          action: reply,
          offer: this.offer.product.price,
        };
        this.sendCounterOffer(data);
      } else { // CounterOFfer
        this.counterOffer.markAsDirty();
        if (this.counterOffer.valid) {
          data = {
            chat_forum_id: this.offer.id, // FORUM ID!
            action: 2,
            offer: this.counterOffer.value,
            message: this.offerMessage.value,
          };
          this.sendCounterOffer(data);
        }
      }
    }
  }

  sendCounterOffer(data: any): void {
    this.communicationService.replyOffer(data).subscribe(resp => {
      this.alertService.open({type: 'success', message: 'Se respondió oferta con éxito'});
      this.counterOffer.reset();
    }, error => {
      this.alertService.open({type: 'error', message: 'No se pudo responder la oferta, vuelva a intentar mas tarde'});
    });
  }

  // Question functions
  getQuestionDetails(id: string): void {
    this.question$ = this.communicationService.getQuestionDetails(id).pipe(
      map(res => res.data),
      catchError(error => {
        throw this.alertService.open({type: 'error', message: error.error.message});
      }
    ));
  }

  reply(id: string): void {
    const data = this.replyQuestion.value as string;
    const emails = data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || [];
    const phones = data.match(/((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/gi) || [];

    if (emails.length > 0) {
      this.emailError = 'No puedes escribir ningun correo';
      return;
    }

    if (phones.length > 0) {
      this.phoneError = 'No puedes escribir ningun teléfono';
      return;
    }

    if (this.repplyActive) {
      this.sendMessage(id);
    } else {
      this.repplyActive = true;
    }
  }

  publishProduct(id: string): void {
    this.communicationService.replyQuestion(id, {published: true}).subscribe(_ => {
      this.alertService.open({ type: 'success', message: 'Pregunta publicada correctamente' });
      this.getQuestionDetails(id);
    }, error => {
      this.alertService.open({type: 'error', message: 'Error al publicar producto, intente más tarde'});
    });
  }

  sendMessage(id: string): void {
    this.replyQuestion.markAsTouched();
    if (this.replyQuestion.valid) {
      const data: any = {
        reply : this.replyQuestion.value,
      };
      this.communicationService.replyQuestion(id, data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Pregunta respondida correctamente' });
        this.repplyActive = false;
        window.location.reload();
      }, error => {
        this.alertService.open({type: 'error', message: 'No se pudo responder la la pregunta, vuelva a intentar mas tarde'});
      });
    }
  }

  // Notification functions
  getNotificationDetails(id: string): void {
    this.notification$ = this.communicationService.getNotificationDetails(id).pipe(
      map(res => res.data),
      catchError(error => { throw this.alertService.open({type: 'error', message: error.error.message}); })
    );
  }

  markOfferAsSeen(id: string, chatID: string): void {
    this.communicationService.markAsSeenOffer(id, true).subscribe(
      resp => {
        this.coreService.getNotificationsNumber();
        this.getOfferDetails(chatID);
      }
    );
  }

  markNotificationasSeen(id: string): void {
    this.communicationService.markAsSeenNotification(id, true).subscribe(
      resp => {
        this.coreService.getNotificationsNumber();
        this.getNotificationDetails(id);
      }
    );
  }

  markQuestionAsSeen(id: string): void {
    this.communicationService.markAsSeenQuestion(id, true).subscribe(
      res => {
        this.coreService.getNotificationsNumber();
        this.getQuestionDetails(id);
      }
    );
  }
}
