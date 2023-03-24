import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/products/interfaces/product';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Order } from '../../interfaces/orders';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {

  order$!: Observable<Order>;
  order_products: any;
  order_id!: string;
  selectedProduct: any;

  product$!: Observable<Product>;
  seller: any;
  crumbData: any = [];

  rate = 0;

  reviewForm = new FormGroup({
    opinion: new FormControl('')
  });
  get opinion(): FormControl { return this.reviewForm.get('opinion') as FormControl; }

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.order_id = this.route.snapshot.params.id;
    if (this.order_id) {
      this.getOrder(this.order_id);
    }
  }

  getOrder(id: string): void {
    this.order$ = this.ordersService.getOrder(id).pipe(
      map(res => {
        this.order_products = res.data.products.map(val => val);
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'}, 
          {txt: 'Mis pedidos', url: '/account/orders'}, 
          {txt: 'Detalle del pedido'+res.data.public_id, url: '/account/orders/'+res.data.id}, 
          {txt: 'Evaluar producto', url: '/account/orders/'+res.data.id+'/product'}, 
        ];
        return res.data;
      }
    ));
  }

  getSeller(id: string): void { 
    this.product$ = this.ordersService.getProduct(id).pipe(map(res => {
      this.seller = res.data;
      return res.data;
    }));
  }

  changeProduct(event: any): void {
    this.selectedProduct = event;
    this.getSeller(event.product.id);
  }

  sendReview(): void {
    if (this.reviewForm.valid && this.rate > 0 && this.selectedProduct?.id) {
      const data = {
        order_product: this.selectedProduct.id,
        rating: this.rate,
        comments: this.opinion.value
      };
      this.ordersService.addProductReview(data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Reseña creada correctamente' });
        this.router.navigate([`/account/orders`]);
      },
        error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al crear la reseña, por favor intente mas tarde'});
        }
      );
    } else {
      this.alertService.open({type: 'warning', message: 'No olvides contestar todos los campos y seleccionar un producto'})
    }
  }

  receiveRate(event: any): void {
    this.rate = event;
  }
}
