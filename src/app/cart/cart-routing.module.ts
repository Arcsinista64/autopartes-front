import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProcessComponent } from './pages/process/process.component';
import { ShipmentInfoComponent } from './pages/shipment-info/shipment-info.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: 'cart',
        component: ProcessComponent
      },
      {
        path: 'success',
        component: SuccessComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCartRoutingModule { }
