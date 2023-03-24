import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAcountComponent } from './my-acount.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';
import { MyAcountMenuComponent } from './pages/my-acount-menu/my-acount-menu.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';

const routes: Routes = [
  {
    path: '',
    component: MyAcountComponent,
    children: [
      {
        path: '',
        component: MyAcountMenuComponent
      },
      {
        path: 'addresses',
        component: AddressesComponent
      },
      {
        path: 'whishlist',
        component: WhishlistComponent
      },
      {
        path: 'payments',
        component: PaymentMethodsComponent
      },
      {
        path: 'information',
        component: GeneralInfoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAcountRoutingModule { }

