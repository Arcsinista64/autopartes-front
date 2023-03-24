import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAcountMenuComponent } from './pages/my-acount-menu/my-acount-menu.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { MyAcountRoutingModule } from './my-acount-routing.module';
import { MyAcountComponent } from './my-acount.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { CdkDetailRowDirective } from './pages/payment-methods/cdk-detail-row.directive';
import { PaymentMethodFormComponent } from './components/payment-method-form/payment-method-form.component';
import { GeneralInfoComponent } from './pages/general-info/general-info.component';

@NgModule({
  declarations: [
    MyAcountMenuComponent,
    MyAcountComponent,
    AddressesComponent,
    WhishlistComponent,
    PaymentMethodsComponent,
    CdkDetailRowDirective,
    PaymentMethodFormComponent,
    GeneralInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    MyAcountRoutingModule
  ]
})
export class MyAcountModule { }
