import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { LocalStorageHandlerService } from 'src/app/shared/services/local-storage-handler.service';
import { environment } from 'src/environments/environment';

declare var Stripe: any;

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  @Input() shipmentCompaniesData = [];
  @Input() shipmentCompaniesPrices = [];
  @Input() oxxoPayment!: boolean;

  showCoupon = false;
  couponsName: string[] = [];
  couponId = '';
  couponValidated = false;

  paymentLoader = false;

  displayedColumns = ['img', 'details'];

  products$!: Observable<any>;
  checkout$!: Observable<any>;
  address$!: Observable<any>;
  payment$!: Observable<any>;

  addressId = null;
  paymentId = null;

  checkoutSubtotal = 0;
  checkoutShipment = 0;
  checkoutDiscount = 0;

  private stripeService: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private alertService: AlertService,
    private localStorage: LocalStorageHandlerService
  ) { }

  ngOnInit(): void {
    this.stripeService = Stripe(environment.publicStripeID);
    this.getCheckout();
    window.scroll(0, 0);
  }

  getCheckout(): void {
    this.checkout$ = this.cartService.getDefaults().pipe(
      map(res => {
        this.addressId = res.data[0].default_address.id;
        this.paymentId = res.data[0]?.default_payment_method?.id || '';
        this.checkoutSubtotal = res.data[0].subtotal || 0;
        this.products$ = of(res.data[0].cart_products[0].cart_products);
        // Iterates all prices to create a sum for shipping
        this.checkoutShipment = this.shipmentCompaniesPrices.reduce((sum: any, current: any) => sum + current, 0);

        return res.data;
      }), catchError(error => {
        throw this.alertService.open({type: 'error', message: error?.error?.message || 'Error al obtener información, intente más tarde'});
    }));
  }

  resetCoupon(): void {
    this.couponValidated = false;
    this.showCoupon = false;
    this.couponsName = [];
    this.couponId = '';
  }

  getCoupon(): void {
    if (this.couponId !== '') {
      this.cartService.verifyCoupon(this.couponId).subscribe(resp => {
        this.couponValidated = true;
        this.showCoupon = false;
        this.couponsName.push(this.couponId);
        this.alertService.open({type: 'success', message: 'Cupon agregado con éxito'});
      }, error => {
        this.resetCoupon();
        this.alertService.open({type: 'error', message: error.error.message});
      });
    } else {
      this.resetCoupon();
    }
  }

  confirmOrder(): void {
    if (this.oxxoPayment) {
      this.confirmOrderOxxo();
    } else {
      this.confirmOrderCard();
    }
  }

  confirmOrderCard(): void {
    this.paymentLoader = true;
    if (this.addressId && this.paymentId) {
      if (this.couponId !== '' ) {
        if (this.couponValidated) {
          const data = {
            payment_method_type: 'card',
            address: this.addressId,
            payment_method: this.paymentId,
            shipment_agreement_options: this.shipmentCompaniesData,
            coupon: this.couponId
          };
          this.cartService.makePayment(data).subscribe(resp => {
            this.paymentLoader = false;
            this.alertService.open({type: 'success', message: 'La compra fue un éxito'});
            resp.data.orders.forEach((orders: any) => {
              this.goToSuccessPage(orders.order.id, 'null');
            });
            this.router.navigate([`/account/orders`]);
          }, error => {
            this.paymentLoader = false;
            this.alertService.open({type: 'error',  message: error.error.message });
          });
        } else {
          this.alertService.open({type: 'error', message: 'Cupón no válido'});
        }
      } else {
        const data = {
          payment_method_type: 'card',
          address: this.addressId,
          payment_method: this.paymentId,
          shipment_agreement_options: this.shipmentCompaniesData,
        };
        this.cartService.makePayment(data).subscribe(resp => {
          this.paymentLoader = false;
          this.alertService.open({type: 'success', message: 'La compra fue un éxito'});
          resp.data.orders.forEach((orders: any) => {
            this.goToSuccessPage(orders.order.id, 'null');
          });
          this.router.navigate([`/account/orders`]);
        }, error => {
          this.paymentLoader = false;
          this.alertService.open({type: 'error',  message: error.error.message });
        });
      }
    }
  }

  confirmOrderOxxo(): void {
    this.paymentLoader = true;
    const data = {
      payment_method_type: 'oxxo',
      shipment_agreement_options: this.shipmentCompaniesData,
    };
    this.cartService.makePayment(data).subscribe(resp => {
      resp.data.orders.forEach((orders: any) => {
        this.generateOxxoPDF(orders.oxxo_data[0], orders.order.id);
      });
      this.router.navigate([`/account/orders`]);
    }, error => {
      this.alertService.open({type: 'error', message: 'Error al generar la compra, por favor intente más tarde'});
    });
  }

  generateOxxoPDF(oxxoData: { client_secret: string, intent_id: string, email: string, name: string}, orderID: string): void {
    const data = {
      payment_method: {
        billing_details: {
          name: oxxoData.name,
          email: oxxoData.email
        }
      }
    };
    this.stripeService.confirmOxxoPayment(oxxoData.client_secret, data).then((res: any) => {
      if (res.error) {
        this.alertService.open({type: 'error', message: 'Hubo un error al conseguir el PDF, intente más tarde'});
      } else {
        const url = res.paymentIntent.next_action.oxxo_display_details.hosted_voucher_url;
        this.alertService.open({type: 'success', message: 'Se creó la orden con éxito'});
        this.paymentLoader = false;
        this.saveOxxoLink(orderID, url);
      }
    });
  }

  saveOxxoLink(orderID: string, url: string): void {
    this.cartService.saveOXXOLink(orderID, url).subscribe(resp => {
      this.goToSuccessPage(orderID, url);
    }, error => {
      this.alertService.open({type: 'warning', message: 'Error al guardar el link'});
      this.goToSuccessPage(orderID, url);
    });
  }

  goToSuccessPage(orderID: any, pdf: string): void {
    window.open('success?order=' + orderID + '&pdf=' + pdf, '_blank');
  }

  openProduct(id: string): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/product/detail/${id}`])
    );
    window.open(url, '_blank');
  }
}
