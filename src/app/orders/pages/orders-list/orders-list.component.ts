import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrderFiltersComponent } from '../../components/order-filters/order-filters.component';
import { orderStatus } from '../../interfaces/orders';
import translateDevo from 'src/app/orders/helpers/devolutionTranslate';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @ViewChild('filter_panel') filter_panel!: OrderFiltersComponent;

  orders: any;
  order_products: any;
  orderStatus$: Observable<any> = new Observable<any>();
  ordersTab = '';
  status = orderStatus;
  ordersLength = 0;
  openFilter = false;
  selectedTab = 0;
  crumbData: any = [];

  translateDevolution = translateDevo; // Get imported function to global variable

  constructor(
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.crumbData = [
      {txt: 'Mi cuenta', url: '/account'},
      {txt: 'Mis pedidos', url: '/account/orders'},
    ];
  }

  setOrders(filters: any): void {
    this.orders = filters;
    this.ordersLength = filters.length;
  }

  setProducts(event: any): void {
    this.order_products = event;
  }

  changeContent(e?: any): void {
    this.selectedTab = e.index;
    this.filter_panel.filterForm.reset();
    this.filter_panel.getStatus(e.index);
    this.ordersTab = e.tab.textLabel;
  }

  redirectToDetail(id: string): void {
    this.router.navigate([`/account/orders/${id}`]);
  }

  redirectToSellerReview(id: string): void {
    this.router.navigate([`/account/orders/${id}/seller`]);
  }

  redirectToProductReview(id: string): void {
    this.router.navigate([`/account/orders/${id}/product`]);
  }

  redirectToRecipe(url: string): void {
    if (url) {
      window.location.href = url;
    } else {
      this.alertService.open({type: 'warning', message: 'No cuenta con recibo'});
    }
  }
}
