import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { MyCartRoutingModule } from './cart-routing.module';
import { CoreModule } from '../core/core.module';
import { CartComponent } from './cart.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ShipmentInfoComponent } from './pages/shipment-info/shipment-info.component';
import { SuccessComponent } from './pages/success/success.component';
import { ProcessComponent } from './pages/process/process.component';



@NgModule({
  declarations: [CartComponent, MyCartComponent, CheckoutPageComponent, ShipmentInfoComponent, SuccessComponent, ProcessComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MyCartRoutingModule,
    CoreModule
  ],
  exports: [MyCartComponent],
})
export class CartModule { }
