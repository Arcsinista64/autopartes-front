import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Order } from 'src/app/orders/interfaces/orders';
import { OrdersService } from 'src/app/orders/services/orders.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  checkout = [{ card_type: 0 }];
  displayedColumns = ['img', 'details'];
  products$: any;
  addressInfo: any;
  paymentInfo: any;
  order$!: Observable<Order>;
  orderId = '';

  downPDFurl = 'null';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private orderService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.setUpData();
  }

  setUpData(): void {
    this.orderId = this.route.snapshot.queryParams?.order;
    this.downPDFurl = this.route.snapshot.queryParams?.pdf as string;
    if (this.orderId) {
      this.order$ = this.orderService.getOrder(this.orderId).pipe(
        map(resp => {
          this.products$ = of(resp.data.products);
          return resp.data as Order;
        }, catchError((errorResp) => {
          this.router.navigate(['/']);
          throw this.alertService.open({type: 'success', message: 'Detalle de pedido, no encontrado'});
        })));
    } else {
      this.router.navigate(['/']);
    }
  }

  getMonth(month: string): string {
    return (Number(month) <= 9) ? '0' + month : month;
  }

  lastTwo(year: string): string {
    return (year.length === 4) ? year.slice(-2) : year;
  }

  exit(): void {
    this.router.navigate(['/product/search/']);
  }

  downloadPDF(url: string): void {
    window.location.href = url;
  }

  getShipping(price: any, shipping: any): number {
    return parseFloat(price || 0) + parseFloat(shipping || 0);
  }

  gotToOrderDetail(): void {
    this.router.navigate([`/account/orders/${this.orderId}`]);
  }
}
