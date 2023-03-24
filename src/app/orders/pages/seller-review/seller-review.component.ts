import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/products/interfaces/product';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Order } from '../../interfaces/orders';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-seller-review',
  templateUrl: './seller-review.component.html',
  styleUrls: ['./seller-review.component.scss']
})
export class SellerReviewComponent implements OnInit, AfterContentChecked {

  rdProduct!: number;
  rdSeller!: number;

  order$!: Observable<Order>;
  product$!: Observable<Product>;
  order_products: any;
  order_id!: string;
  selectedProduct!: any;
  seller: any;
  crumbData: any = [];

  reviewForm = new FormGroup({
    opinion: new FormControl(''),
    seller_review: new FormControl('', Validators.required),
    products_match: new FormControl('', Validators.required),
  });
  get opinion(): FormControl { return this.reviewForm.get('opinion') as FormControl; }
  get seller_review(): FormControl { return this.reviewForm.get('seller_review') as FormControl; }
  get products_match(): FormControl { return this.reviewForm.get('products_match') as FormControl; }


  seller_options = [
    { text: 'Bueno', id: 0 },
    { text: 'Neutral', id: 1 },
    { text: 'Malo', id: 2 }
  ];

  product_match_options = [
    { text: 'Sí', id: 0 },
    { text: 'No', id: 1 }
  ];


  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngAfterContentChecked(): void {
    // window.scroll(0, 0);
  }

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
          {txt: 'Evaluar vendedor', url: '/account/orders/'+res.data.id+'/seller'}, 
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
    if (this.reviewForm.valid && this.seller && this.seller_review.value !== '' && this.order_id !== '') {
      const data = {
        seller: this.seller[0].product.seller.id,
        rating: this.seller_review.value,
        order: this.order_id,
        comment: this.opinion.value
      };
      this.ordersService.addSellertReview(data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Reseña creada correctamente' });
        this.router.navigate([`/account/orders`]);
      }, error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al crear la reseña, por favor intente mas tarde'});
        }
      );
    } else {
      this.alertService.open({type: 'warning', message: 'No olvides contestar todos los campos y seleccionar un producto'})
    }
  }
}

