import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { ServerResponse } from 'src/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private base: BaseService) { }

  getAllCommunications(): Observable<ServerResponse<any>> {
    return this.base.get(`notifications_module/notifications/all/`);
  }

  getAllNotifications(): Observable<ServerResponse<any>> {
    return this.base.get(`notifications_module/notifications/`);
  }

  getNotificationDetails(id: string): Observable<ServerResponse<any>> {
    return this.base.get(`notifications_module/notification/${id}/`);
  }

  getQuestionDetails(id: string): Observable<ServerResponse<any>> {
    return this.base.get(`notifications_module/question/${id}/`);
  }

  replyQuestion(id: string, data: any): Observable<ServerResponse<any>> {
    return this.base.put(`notifications_module/question/${id}/`, data);
  }

  getAllQuestions(): Observable<ServerResponse<any>> {
    return this.base.get('notifications_module/questions/');
  }

  getAllChatOffers(): Observable<ServerResponse<any>> {
    return this.base.get(`chat_module/offers/`);
  }

  createOffer(data: any): Observable<ServerResponse<any>> {
    return this.base.post(`chat_module/chat_forum/`, data);
  }

  getOfferDetails(id: any): Observable<ServerResponse<any>> {
    return this.base.get(`chat_module/chat_forum/${id}/`);
  }

  replyOffer(data: any): Observable<ServerResponse<any>> {
    return this.base.post(`chat_module/chat_forum_message/`, data);
  }

  markAsSeenNotification(id: string, receiver_seen: boolean): Observable<ServerResponse<any>> {
    return this.base.put(`notifications_module/notification/${id}/`, {receiver_seen});
  }

  markAsSeenOffer(id: string, sender_seen: boolean): Observable<ServerResponse<any>> {
    return this.base.put(`notifications_module/offer/${id}/`, {sender_seen});
  }

  markAsSeenQuestion(id: string, sender_seen: boolean): Observable<ServerResponse<any>> {
    return this.base.put(`notifications_module/question/${id}/`, {sender_seen});
  }

}
