import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { CommunicationRoutingModule } from './communication-routing.module';
import { CommunicationComponent } from './communication.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { OffersComponent } from './components/offers/offers.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ChatComponent } from './components/chat/chat.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NotificationCenterComponent } from './pages/notification-center/notification-center.component';
import { WordingComponent } from './components/wording/wording.component';
import { AllNotificationsComponent } from './components/all-notifications/all-notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    CommunicationComponent,
    TruncateTextPipe,
    OffersComponent,
    QuestionsComponent,
    ChatComponent,
    SideMenuComponent,
    NotificationCenterComponent,
    WordingComponent,
    AllNotificationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    CommunicationRoutingModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class CommunicationModule { }
