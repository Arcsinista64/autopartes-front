import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit {
  crumbData: any = [];
  allCommunications$!: Observable<any[]>;
  questions$!: Observable<any[]>;
  offers$!: Observable<any[]>;
  notifications$!: Observable<any[]>;

  allCommunications: any = [];

  notificationType = ''; // Notification type: 0 all, 1 offers, 2 questions, 3 notifications

  empty!: boolean;

  // This logic might change when websocket is implemented in later improvements
  newNotification = false;
  newOffer = false;
  newQuestion = false;
  newAll = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private activeRoute: ActivatedRoute,
    private communicationService: CommunicationService,
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth');
    }
    if (this.activeRoute.snapshot.params.section) {
      this.notificationType = this.activeRoute.snapshot.params.section;
      this.setNoti(this.notificationType);
    }
  }

  setNoti(event: string): void {
    switch (event) {
      case 'all': {
        this.getAllCommunications();
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Todas las notificaciones', url: '/communication/all', type: 'all'},
        ];
        break;
      }
      case 'offers': {
        this.getOffers();
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Ofertas', url: '/communication/offers', type: 'offers'},
        ];
        break;
      }
      case 'questions': {
        this.getQuestions();
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Preguntas', url: '/communication/questions', type: 'questions'},
        ];
        break;
      }
      case 'notifications': {
        this.getNotifications();
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Notificaciones', url: '/communication/notifications', type: 'notifications'},
        ];
        break;
      }
      default: {
        break;
      }
    }
    this.notificationType = event;
  }

  getAllCommunications(): void {
    this.allCommunications$ = this.communicationService.getAllCommunications().pipe(
      map(res => {
        this.allCommunications = [];
        const offerNotifications = res.data.offer_notifications;
        const questionNotifications = res.data.question_notifications;
        const generalNotification = res.data.general_notifications;

        this.empty = (offerNotifications.length === 0 && questionNotifications.length === 0 && generalNotification.length === 0);

        // This logic might change when websocket is implemented in later improvements
        // this.newOffer = this.getSeen(offerNotifications);
        // this.newQuestion = this.getSeen(questionNotifications);
        // this.newNotification = this.getSeen(generalNotification);
        // this.newAll =  (this.newOffer || this.newQuestion || this.newAll);

        for (const item of offerNotifications) {
          this.allCommunications.push({type: 1, item});
        }

        for (const item of questionNotifications) {
          this.allCommunications.push({type: 2, item});
        }

        for (const item of generalNotification) {
          this.allCommunications.push({type: 3, item: {notification: item}});
        }
        return this.allCommunications.sort((a: any, b: any) => {
          const aDate = new Date(a.item.updated_at || a.item.notification.updated_at);
          const bDate = new Date(b.item.updated_at || b.item.notification.updated_at);
          return bDate.getUTCDay() - aDate.getUTCDate();
        });
      }),
      catchError(errorResp => {
        throw this.alertService.open({type: 'error', message: 'Error al conseguir todas las notificaciones, intenta más tarde'});
    }));
  }

  getOffers(): void {
    this.offers$ = this.communicationService.getAllChatOffers().pipe(
      map(res => {
        // this.newOffer = this.getSeen(res.data); // This logic might change when websocket is implemented in later improvements
        this.empty = res.data.length === 0;
        return res.data;
      }),
      catchError(errorResp => {
        throw this.alertService.open({type: 'error', message: 'Error al conseguir ofertas, intente más tarde'});
    }));
  }

  getQuestions(): void {
    this.questions$ = this.communicationService.getAllQuestions().pipe(
      map(res => {
        // this.newQuestion = this.getSeen(res.data); // This logic might change when websocket is implemented in later improvements
        this.empty = res.data.length === 0;
        return res.data;
      }),
      catchError(errorResp => {
        throw this.alertService.open({type: 'error', message: 'Error al conseguir preguntas, intente más tarde'});
    }));
  }

  getNotifications(): void {
    this.notifications$ = this.communicationService.getAllNotifications().pipe(
      map(res => {
        // this.newNotification = this.getSeen(res.data); // This logic might change when websocket is implemented in later improvements
        this.empty = res.data.length === 0;
        return res.data;
      }),
      catchError(errorResp => {
        throw this.alertService.open({type: 'error', message: 'Error al conseguir más tarde, intente más tarde' });
    }));
  }

  /**
   * Identifies if inside the array, there is any false or null in sender_seen variable
   * @param dataArr that contains data
   * @returns boolean
   * This logic might change when websocket is implemented in later improvements
   */
   getSeen(dataArr: any[]): boolean {
    return dataArr.some((ele: any) => !ele.sender_seen);
  }

  addCrumb(event: any, type: number): void {
    switch (type) {
      case 0: {
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Todas las notificaciones', url: '/communication/all', type: 'all'},
          {txt: event, url: '/communication/all', type: 'all'},
        ];
        break;
      }
      case 1: {
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Ofertas', url: '/communication/offers', type: 'offers'},
          {txt: event, url: '/communication/offers', type: 'offers'},
        ];
        break;
      }
      case 2: {
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Preguntas', url: '/communication/questions', type: 'questions'},
          {txt: event, url: '/communication/questions', type: 'questions'},
        ];
        break;
      }
      case 3: {
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Notificaciones', url: '/communication/notifications', type: 'notifications'},
          {txt: event, url: '/communication/notifications', type: 'notifications'},
        ];
        break;
      }
      default: {
        break;
      }
    }
  }
}
