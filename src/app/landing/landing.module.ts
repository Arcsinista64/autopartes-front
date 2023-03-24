import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { OffersComponent } from './pages/offers/offers.component';
import { NewsComponent } from './pages/news/news.component';
import { NewDetailComponent } from './pages/new-detail/new-detail.component';
import { DecodeComponent } from './pages/decode/decode.component';
import { SellComponent } from './pages/sell/sell.component';
import { HelpComponent } from './pages/help/help.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingComponent, PrincipalComponent, FeaturedProductsComponent, OffersComponent, NewsComponent, NewDetailComponent, DecodeComponent, SellComponent, HelpComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    PrincipalComponent
  ]
})
export class LandingModule { }
