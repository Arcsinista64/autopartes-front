import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { DecodeComponent } from './pages/decode/decode.component';
import { FeaturedProductsComponent } from './pages/featured-products/featured-products.component';
import { HelpComponent } from './pages/help/help.component';
import { NewDetailComponent } from './pages/new-detail/new-detail.component';
import { NewsComponent } from './pages/news/news.component';
import { OffersComponent } from './pages/offers/offers.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SellComponent } from './pages/sell/sell.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: PrincipalComponent
      },
      {
        path: 'featured',
        component: FeaturedProductsComponent
      },
      {
        path: 'offers',
        component: OffersComponent
      },
      {
        path: 'decode',
        component: DecodeComponent
      },
      {
        path: 'sell',
        component: SellComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'blog',
        component: NewsComponent
      },
      {
        path: 'blog/:id',
        component: NewDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }