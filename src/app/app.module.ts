import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';

import { MaterialModule } from './material/material.module';
import { CartModule } from './cart/cart.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MyAcountModule } from './my-acount/my-acount.module';
import { OrdersModule } from './orders/orders.module';
import { ProductCatalogComponent } from './products/pages/product-catalog/product-catalog.component';
import { CommunicationModule } from './communication/communication.module';
import { LandingModule } from './landing/landing.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoadScriptsService } from './shared/services/load-scripts.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    CartModule,
    NgxSliderModule,
    MyAcountModule,
    OrdersModule,
    LandingModule,
    CommunicationModule,
    LandingModule,
    SharedModule
  ],
  providers: [
    CookieService,
    ProductCatalogComponent,
    NavbarComponent,
    LoadScriptsService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
