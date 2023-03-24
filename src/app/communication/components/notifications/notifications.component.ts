import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreService } from 'src/app/core/services/core.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() chatList!: any;
  @Input() empty!: any;
  @Output() notificationSelected: EventEmitter<string> = new EventEmitter<string>();

  noti$!: Observable<any[]>;
  senderName = '';
  message = '';

  initial!: string;
  color!: string;
  receiver = '';
  title = '';
  snippet = '';
  updatedDate = '';

  details = false;

  chatSelected = '';

  constructor(
    private coreService: CoreService,
    private alertService: AlertService,
    private communicationService: CommunicationService,
  ) { }

  ngOnInit(): void {
  }

  setCrumb(event: any): void {
    this.notificationSelected.emit(event);
  }

  openChat(id: string, sender: string, message: string, seen: boolean): void {
    if (window.innerWidth <= 600) {
      this.details = true;
    }
    this.chatSelected = id;
    this.senderName = sender;
    this.message = message;
    this.initial = sender[0];
    this.color = id[0];
    (seen) ? this.getNotificationDetails(id) : this.markNotificationasSeen(id);
  }

  getNotificationDetails(id: string): void {
    this.noti$ = this.communicationService.getNotificationDetails(id).pipe(
      map(res => {
        this.title = res.data.title;
        this.snippet = res.data.snippet;
        this.receiver = res.data.receiver.first_name;
        this.message = res.data.message;
        this.updatedDate = res.data.updated_at;
        return res.data;
      },
      catchError(error => {
        throw this.alertService.open({type: 'error', message: error.error.message});
      })
    ));
  }

  markNotificationasSeen(id: string): void {
    this.communicationService.markAsSeenNotification(id, true).subscribe(
      resp => { 
        this.coreService.getNotificationsNumber();
        this.getNotificationDetails(id);
      }
    );
  }

}
