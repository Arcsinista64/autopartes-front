import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { ProductReviewComponent } from './pages/product-review/product-review.component';
import { SellerReviewComponent } from './pages/seller-review/seller-review.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: OrdersListComponent
      },
      {
        path: ':id',
        component: OrderDetailComponent
      },
      {
        path: ':id/product',
        component: ProductReviewComponent
      },
      {
        path: ':id/seller',
        component: SellerReviewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

