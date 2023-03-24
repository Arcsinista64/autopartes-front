import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationComponent } from './communication.component';
import { OffersComponent } from './components/offers/offers.component';
import { NotificationCenterComponent } from './pages/notification-center/notification-center.component';

const routes: Routes = [
  {
    path: '',
    component: CommunicationComponent,
    children: [
      {
        path: '',
        component: NotificationCenterComponent
      },
      {
        path: ':section',
        component: NotificationCenterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationRoutingModule { }