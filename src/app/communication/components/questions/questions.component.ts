import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreService } from 'src/app/core/services/core.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  seller = false;
  question$!: Observable<any>;
  emailError = '';
  phoneError = '';
  @Input() chatList!: any;
  @Input() empty!: any;
  @Output() notificationSelected: EventEmitter<string> = new EventEmitter<string>();

  replyActive = false;

  selectedQuestionID = '';

  questionForm = new FormGroup({
    replyQuestion: new FormControl('', [Validators.required])
  });
  get replyQuestion(): FormControl { return this.questionForm.get('replyQuestion') as FormControl; }

  initialSender = '';
  colorSender: string[] = [];
  initialReceiver = '';
  colorReceiver: string[] = ['receiver'];

  details = false;
  constructor(
    private coreService: CoreService,
    private alertService: AlertService,
    private communicationService: CommunicationService,
  ) { }

  ngOnInit(): void {
  }

  reply(): void {
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

    this.replyQuestion.markAsDirty();
    if (this.questionForm.valid) {
      this.sendMessage();
    }
  }

  setCrumb(event: any): void {
    this.notificationSelected.emit(event);
  }

  openChat(id: string, senderName: string, senderColor: string, receiver: string, seen: string, seller: boolean): void {
    this.seller = seller;
    if (window.innerWidth <= 600) {
      this.details = true;
    }

    this.initialSender = senderName[0];
    this.initialReceiver = receiver[0];
    this.colorSender = [];

    for (const item of senderColor) {
      this.colorSender.push(item);
      break;
    }

    this.selectedQuestionID = id;
    (seen) ? this.getQuestionDetails(id) : this.markQuestionAsSeen(id);
  }

  sendMessage(): void {
    if (this.replyQuestion.valid) {
      const data: any = {
        reply : this.replyQuestion.value,
      };
      this.communicationService.replyQuestion(this.selectedQuestionID, data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Pregunta respondida correctamente' });
        this.replyActive = false;
        window.location.reload();
      }, error => {
        this.alertService.open({type: 'error', message: 'No se pudo responder la la pregunta, vuelva a intentar mas tarde'});
      });
    }
  }

  publishProduct(): void {
    this.communicationService.replyQuestion(this.selectedQuestionID, {published: true}).subscribe(_ => {
      this.alertService.open({ type: 'success', message: 'Pregunta publicada correctamente' });
      this.getQuestionDetails(this.selectedQuestionID);
    }, error => {
      this.alertService.open({type: 'error', message: 'Error al publicar producto, intente más tarde'});
    });
  }

  getQuestionDetails(id: string): void {
    this.question$ = this.communicationService.getQuestionDetails(id).pipe(
      map(res => res.data),
      catchError(error => { throw this.alertService.open({type: 'error', message: error.error.message}); })
    );
  }

  markQuestionAsSeen(id: string): void {
    this.communicationService.markAsSeenQuestion(id, true).subscribe(
      resp => { 
        this.coreService.getNotificationsNumber();
        this.getQuestionDetails(id); }
    );
  }
}
