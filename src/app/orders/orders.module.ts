import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { SellerReviewComponent } from './pages/seller-review/seller-review.component';
import { ProductReviewComponent } from './pages/product-review/product-review.component';
import { ReviewComponent } from '../products/components/review/review.component';
import { OrderFiltersComponent } from './components/order-filters/order-filters.component';


@NgModule({
  declarations: [OrdersComponent, OrdersListComponent, OrderDetailComponent, SellerReviewComponent, ProductReviewComponent, OrderFiltersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
  ]
})
export class OrdersModule { }
