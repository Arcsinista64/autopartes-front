import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Order, orderStatus } from '../../interfaces/orders';
import { OrdersService } from '../../services/orders.service';
import translateDevo from 'src/app/orders/helpers/devolutionTranslate';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @ViewChild('modal') modalRef!: ModalComponent;
  @ViewChild('modalDevolutionDetail') modalDevolutionDetailRef!: ModalComponent;
  @ViewChild('trackermodal') trackerModalRef!: ModalComponent;
  order$!: Observable<Order>;
  devolutionDetail$!: Observable<any>;
  products: any = [];
  devolutions: any = [];
  status = orderStatus;
  order_id!: string;
  crumbData: any = [];
  selectedProduct: any;

  translateDevolution = translateDevo; // Get imported function to global variable

  productInfo = new FormArray([]);

  maxQuantityDetail = 0;
  quantityDetailBackup = 0;
  devolutionsSelected: any = [];

  allInDevolutionProcess = true;

  devolutionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    quantity: new FormControl({value: '', disabled: true}, Validators.required),
  });

  get name(): FormControl { return this.devolutionForm.get('name') as FormControl; }
  get reason(): FormControl { return this.devolutionForm.get('reason') as FormControl; }
  get quantity(): FormControl { return this.devolutionForm.get('quantity') as FormControl; }

  devolutionDetailForm = new FormGroup({
    quantityDetail: new FormControl(0),
  });
  get quantityDetail(): FormControl { return this.devolutionDetailForm.get('quantityDetail') as FormControl; }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ordersService: OrdersService,
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
        this.products = res.data.products.map((val: any) => {
          val.tracking_url !== '' ?
          this.productInfo.push(this.createProductInfo(val.tracking_url, val.shipping_company, val.shipping_guide)) :
          this.productInfo.push(this.createProductInfo(null, val.shipping_company, val.shipping_guide));
          return val;
        });
        this.crumbData = [
          {txt: 'Mi cuenta', url: '/account'},
          {txt: 'Mis pedidos', url: '/account/orders'},
          {txt: 'Detalle del pedido ' + res.data.public_id, url: '/account/orders/' + res.data.id},
        ];

        this.products.map((item: { devolution: any; }) => {
          if (item.devolution[0]?.remaining !== 0) {
            this.allInDevolutionProcess = false;
          }
        });
        this.devolutions = this.products.map((val: { devolution: any; }) => val.devolution);
        return res.data;
      }
    ));
  }

  validateMaxQty(): void { 
    if(this.quantity.value > this.selectedProduct.quantity ||
      this.quantity.value > this.selectedProduct.devolution[0]?.remaining) {
      if(this.selectedProduct.devolution[0]?.remaining) {
        this.devolutionForm.patchValue({quantity:this.selectedProduct.devolution[0]?.remaining});
      } else {
        this.devolutionForm.patchValue({quantity:this.selectedProduct.quantity});
      }
    } else {

    }
  }

  openModal(): void {
    this.modalRef.openModal();
  }

  changeProduct(event: any): void {
    this.quantity.enable();
    this.selectedProduct = event;
  }

  redirectToSellerReview(): void {
    const id = this.order_id;
    this.router.navigate([`/account/orders/${id}/seller`]);
  }

  redirectToProductReview(): void {
    const id = this.order_id;
    this.router.navigate([`/account/orders/${id}/product`]);
  }

  redirectToRecipe(url: string): void {
    if (url) {
      window.location.href = url;
    } else {
      this.alertService.open({type: 'warning', message: 'No cuenta con recibo'});
    }
  }

  sendShipment(): void {
    this.devolutionForm.markAllAsTouched();
    if (this.selectedProduct && this.devolutionForm.valid) {
      const devolution = {
        name: this.name.value,
        order_product: this.selectedProduct.id,
        // TODO: Define how to send correctly this data
        shipping_guide: '',
        shipping_cost: 0,
        shipping_company: '',
        quantity: this.quantity.value,
        reason: this.reason.value
      };
      this.ordersService.setDevolution(devolution).subscribe(resp => {
        this.modalRef.hideModal();
        this.alertService.open({type: 'success', message: 'Solicitud de envío realizada con éxito'});
        setTimeout(() => { window.location.reload(); }, 1250);
      }, error => {
        this.alertService.open({type: 'error', message: error.error.message});
      });
    } else {
      this.alertService.open({ type: 'warning', message: 'Por favor llena todos los datos'});
    }
  }

  copy(code: string): void {
    navigator.clipboard.writeText(code);
  }

   createProductInfo(url: string | null = null, parcel: string | null = null, guide: string | null = null): FormGroup {
    return this.fb.group({
      url: new FormControl(url),
      parcel: new FormControl(parcel),
      guideNumber: new FormControl(guide),
    });
  }

  getFormGroupAt(i: number): FormGroup {
    return this.productInfo.at(i) as FormGroup;
  }

  openDevolutionDetailModal(index: any): void {
    this.devolutionsSelected = this.devolutions[index];
    this.modalDevolutionDetailRef.openModal();
  }

  closeDevolutionDetailModal(): void {
    this.modalDevolutionDetailRef.hideModal();
  }
}
