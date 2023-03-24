import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/communication.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Input() chatList!: any;
  @Input() empty!: any;
  @Output() notificationSelected: EventEmitter<string> = new EventEmitter<string>();

  offer$!: Observable<any>;
  offer: any = [];
  chatSelected = '';

  seller = false;

  counteroffer = false;
  currentOffer!: number;
  originalPrice!: string;

  initial: string[] = [];
  color: string[] = ['receiver'];
  createdDate!: Date;

  details = false;

  offerForm = new FormGroup({
    counterOffer: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
    offer_message: new FormControl('')
  });
  get offer_message(): FormControl { return this.offerForm.get('offer_message') as FormControl; }
  get counterOffer(): FormControl { return this.offerForm.get('counterOffer') as FormControl; }

  constructor(
    private router: Router,
    private coreService: CoreService,
    private alertService: AlertService,
    private communicationService: CommunicationService,
  ) { }

  ngOnInit(): void {
  }

  remainingDays(): string {
    const days = 86400000;
    const created = new Date(this.createdDate).getTime();
    const today = Date.now();
    const aux = Number(7 - (today - created) / days);
    return (aux <= 0) ? '0' : aux.toFixed(0);
  }

  setCrumb(event: any): void {
    this.notificationSelected.emit(event);
  }

  openChat(id: string, initial: string, seen: boolean, notificationID: string, seller: boolean): void {
    this.seller = seller;
    this.counteroffer = false;
    if (window.innerWidth <= 600) {
      this.details = true;
    }

    for (const item of initial || '') {
      this.initial.push(item);
      break;
    }

    this.chatSelected = id;
    (seen) ? this.getOffer(id) : this.markAsSeen(id, notificationID);
    this.getOffer(id);
  }

  markAsSeen(id: string, notificationID: string): void {
    this.communicationService.markAsSeenOffer(notificationID, true).subscribe(
      resp => { 
        this.coreService.getNotificationsNumber();
        this.getOffer(id);
      }
    );
  }

  showOfferbuttons(offer: any): boolean {
    if (this.seller) {
      return (offer.status !== 2);
    } else { // Buyer
      return (offer.status === 2); // Counter Offer
    }
  }

  change(): void {
    this.counteroffer = !this.counteroffer;
    this.counterOffer.reset();
  }

  getOffer(id: string): void {
    this.offer$ = this.communicationService.getOfferDetails(id).pipe(
      map(res => {
        this.offer = res.data;
        this.originalPrice = res.data.product.price;
        this.currentOffer = res.data.offer;
        this.createdDate = res.data.created_at;
        this.remainingDays();
        return res.data;
      }
    ));
  }


  goTo(id: string): void {
    this.router.navigate([`product/detail/` + id]);
  }

  sendCounterOfferLogic(reply: number): void {
    let data = { };
    if (reply === 0) { // Accepted
      if (this.offer.status === 2) { // Send counter offer when accepeted
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
          chat_forum_id: this.offer.id,
          action: reply,
          offer: this.originalPrice,
        };
        this.sendCounterOffer(data);
      } else {
        this.counterOffer.markAsDirty();
        if (this.counterOffer.valid) {
          data = {
            chat_forum_id: this.offer.id,
            action: 2,
            offer: this.counterOffer.value,
            message: this.offer_message.value,
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
      window.location.reload();
    }, error => {
      this.alertService.open({type: 'error', message: 'No se pudo responder la oferta, vuelva a intentar mas tarde'});
    });
  }

}
