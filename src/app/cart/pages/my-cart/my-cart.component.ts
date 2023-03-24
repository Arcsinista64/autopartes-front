import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoreService } from 'src/app/core/services/core.service';
import { ProductsService } from 'src/app/products/services/products.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LocalStorageHandlerService, SimpleLocalProduct } from 'src/app/shared/services/local-storage-handler.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  @Output() openCheckoutInfo: EventEmitter<{ shipment_companies_data: any, shipment_companies_prices: any }> = new EventEmitter();

  crumbData: any = [];
  default = '../../../../assets/default-image.jpg'

  @ViewChild('modalDelete') modalDeleteRef!: ModalComponent;

  products$: Observable<any> = of(null);
  displayedColumns = ['img', 'description', 'qty', 'price'];

  subtotal = 0;
  products: any = [];

  id_toDelete = '';
  index_toDelete!: number;

  shipment_agreement_options: any[] = [];

  counterShipment = 0;
  validParcels = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private coreService: CoreService,
    private alertService: AlertService,
    private productService: ProductsService,
    private localStorageHandler: LocalStorageHandlerService,
  ) {
  }

  quantities = new FormArray([
    this.createProductQuantityItem()
  ]);

  ngOnInit(): void {
    this.setUp();
    this.crumbData = [
      {txt: 'Carrito', url: '/checkout/cart'},
    ];
    window.scroll(0, 0);
  }

  setUp(): void {
    if (this.authService.isLoggedIn()) {
      if (this.localStorageHandler.productsEmpty()) {
        this.getProducts();
      } else {
        this.setProductsFromNoneAuth();
      }
    } else {
      this.getNoneAuthProducts();
    }
  }

  /**
   * Creates a quantity item FormGroup.
   */
  createProductQuantityItem(): FormGroup {
    return this.fb.group({
      productID: new FormControl(),
      quantity: new FormControl(''),
      parcelID: new FormControl(null),
      parcelPrice: new FormControl(),
      maxQty: new FormControl(1),
    });
  }

  getFormGroupAt(i: number): FormGroup {
    return this.quantities.at(i) as FormGroup;
  }

  /**
   * Gets products when not logged in
   */
  getNoneAuthProducts(): void {
    const prod = this.localStorageHandler.getProducts();
    this.products$ = this.cartService.getAllFakeProducts(prod).pipe(
      map(res => {
        this.counterShipment = 0;
        this.products = res.data[0].cart_info.products;
        this.subtotal = 0;
        this.quantities.clear();
        this.products.map((resp: { id: any, quantity: any; product: any; }, i: number) => {
          if (resp.product.shipment_agreement_options?.length > 0) {
            this.counterShipment += 1;
          }
          this.setUpSubTotal(resp.quantity, resp.product.price);
          this.prealoadQuantities(i, resp.id, resp.quantity, resp.product.quantity);
        });
        return (res.data[0].cart_info.products.length === 0) ? null : res.data[0].cart_info.products;
      }),
      catchError(error => {
        throw this.alertService.open({type: 'error', message: 'Hubo un error al obtener los productos, por favor intente más tarde.'}); 
      })
    );
  }
  /**
   * Gets products when logged in
   */
  getProducts(): void {
    this.products$ = this.cartService.getAllProducts().pipe(
      map(res => {
        this.counterShipment = 0;
        this.products = res.data.cart.products;
        this.subtotal = 0;
        this.quantities.clear();
        this.products.map((resp: { id: any, quantity: any; product: any; buyer: any }, i: number) => {
          if (resp.product.shipment_agreement_options?.length > 0) {
            this.counterShipment += 1;
            if (resp.product.offered_price) {
              this.setUpSubTotal(resp.quantity, resp.product.offered_price.accepted_offer);
            } else {
              this.setUpSubTotal(resp.quantity, resp.product.price);
            }
            this.prealoadQuantities(i, resp.id, resp.quantity, resp.product.quantity, 0);
          } else { 
            if (resp.product.offered_price) {
              this.setUpSubTotal(resp.quantity, resp.product.offered_price.accepted_offer);
            } else {
              this.setUpSubTotal(resp.quantity, resp.product.price);
            }
            this.prealoadQuantities(i, resp.id, resp.quantity,  resp.product.quantity);
          }
        });
        this.localStorageHandler.deleteAllProducts();
        return (res.data.cart.products.length === 0) ? null : res.data.cart.products;
      }), catchError(error => {
        throw this.alertService.open({type: 'error', message: 'Hubo un error al obtener los productos, por favor intente más tarde'}); 
      }));
  }

  /**
   * Sends cart's product to cart when logging in
   */
  setProductsFromNoneAuth(): void {
    const productsInLocalStorage = this.localStorageHandler.getProducts();
    productsInLocalStorage.forEach(element => {
      this.productService.sendProductToCart(element.product, element.quantity).subscribe();
    });
    setTimeout(() => {
      this.getProducts();
      this.localStorageHandler.deleteAllProducts();
      this.coreService.getCartNumber();
    }, 1000);
  }

  /**
   * Sets shipment to array for subtotal
   * @param ele selected product element
   * @param selected option selected from radio
   */
  setShipmentArray(productIndex: any, selected: any): void {
    this.quantities.at(productIndex).get('parcelID')?.patchValue(Number(selected.value.id));
    this.quantities.at(productIndex).get('parcelPrice')?.patchValue(Number(selected.value.cost));
    this.updateSubtotal();
  }

  /**
   * Set quantity for desired product, sent by user
   * @param i index of the product
   * @param quantity typed by user
   */
  prealoadQuantities(i: number, id: number, quantity: string, maxQty: number, price: number | null = null): void {
    this.quantities.push(this.createProductQuantityItem());
    this.quantities.at(i).get('productID')?.patchValue(id);
    this.quantities.at(i).get('quantity')?.patchValue(quantity);
    this.quantities.at(i).get('parcelPrice')?.patchValue(price);
    this.quantities.at(i).get('maxQty')?.patchValue(maxQty);
  }

  setUpSubTotal(quantity: any, price: any): void {
    this.subtotal = quantity * price + Number(this.subtotal);
  }

  updateSubtotal(): void {
    this.subtotal = 0;
    this.products.map((res: any, index: number) => {
      const quantity = Number(this.quantities.at(index).get('quantity')?.value);
      const product = res.product;
      const cost = (product.offered_price) ? Number(product.offered_price.accepted_offer) : Number(product.price);
      const shipment = Number(this.quantities.at(index).get('parcelPrice')?.value);
      this.subtotal = (quantity * cost) + Number(this.subtotal) + shipment;
    });
  }

  inputChange(element: any , index: number, qty: number): void {
    if (element.quantity > 0) {
      if(element.quantity > element.product.quantity) { 
        element.quantity = element.product.quantity;
        this.updateProductQty(element.product.id, element.product.quantity, element, index);
      } else { 
        element.quantity = qty;
        this.updateProductQty(element.product.id, qty, element, index);
      }
    } else {
      this.alertService.open({type: 'warning', message: 'La cantidad del producto no puede ser menor a 1'});
    }
  }

  minun(element: any, index: number): void {
    if (element.quantity - 1 > 0) {
      --element.quantity;
      this.updateProductQty(element.product.id, element.quantity, element, index);
    } else {
      this.alertService.open({type: 'warning', message: 'La cantidad del producto no puede ser menor a 1'});
    }
  }

  plusle(element: any, qty: number, index: number): void {
    if(!this.authService.isLoggedIn()) { 
      if(element.quantity > element.product.quantity) { 
        element.quantity = element.product.quantity;
        this.quantities.at(index).get('quantity')?.patchValue(this.quantities.at(index).get('maxQty')?.value);
        this.updateProductQty(element.product.id, element.quantity, element, index);
      } else { 
        ++element.quantity;
        this.updateProductQty(element.product.id, element.quantity, element, index);
      }
    } else { 
      ++element.quantity;
      this.updateProductQty(element.product.id, element.quantity, element, index);
    }
  }

  /**
   * Routes user if all validations pass
   * @returns if any error
   */
  proceedToPayment(): void {
    this.validParcels = true;
    this.quantities.value.map((item: any) => { 
      if (item.parcelPrice === 0) {
        this.validParcels = false;
      }
    });

    if (this.authService.isLoggedIn()) {
      if (!this.validParcels) {
        this.alertService.open({
          type: 'error',
          message: 'Por favor verifique haber escogido una opción de envío para todos los productos que apliquen'
        });
        return;
      }
      if (this.quantities.valid && this.validParcels) {
        this.alertService.open({
          type: 'success',
          message: 'Confirmación de pedido'
        });
        const shipment_data: any = [];
        this.quantities.value.map((item: any) =>  {
          item.parcelID ?
          shipment_data.push({cart_product: item.productID, shipment_agreement_option: item.parcelID}) :
          '';
        });

        this.openCheckoutInfo.emit({
          shipment_companies_data: shipment_data, shipment_companies_prices: this.quantities.value.map((item: any) => item.parcelPrice)
        });

      } else {
        return;
      }
    } else {
      this.router.navigate(['auth/register/'], {queryParams: {checkout: true}});
    }
  }

  /**
   * Deletes product
   * @param id from product to be deletes
   */
  delete(id: any): void {
    if (this.authService.isLoggedIn()) {
      this.cartService.deleteProduct(id).subscribe(
        _ => {
          this.quantities.removeAt(this.index_toDelete);
          this.modalDeleteRef.hideModal();
          this.alertService.open({ type: 'success', message: 'Se eliminó el producto con éxito' });
          this.coreService.getCartNumber();
          this.setUp();
        },
        error => {
          this.alertService.open({type: 'error', message: 'Error al eliminar un producto del carrito.'});
        }
      );
    } else {
      this.localStorageHandler.deleteProduct(id);
      this.alertService.open({ type: 'success', message: 'Se eliminó el producto con éxito' });
      this.setUp();
    }
  }

  /**
   * Oepens modal for deleting product
   * @param id recieves product´s id
   * @param index recieves
   */
  openDelete(id: any, index: number): void {
    this.id_toDelete = id;
    this.index_toDelete = index;
    this.modalDeleteRef.openModal();
  }

  /**
   * Close ´deleting product¨ modal, whitout actaully deleting a product
   */
  closeDelete(): void {
    this.modalDeleteRef.hideModal();
  }

  /**
   * Actual delete for cart´s product
   */
  confirmDelete(): void {
    this.delete(this.id_toDelete);

  }

  /**
   * Sets the value that the table will use to track value changes. It is assigned to
   * the index in order to avoid refreshing the whole table when a single value is edited.
   * @param index The index of the row
   * @param _ The value of the row, underscore since it is not used.
   */
  trackByIndex(index: any, _: any): number {
    return index;
  }

  /**
   * calls product service to determinate max stock and returns incorrect value
   * @param product : Product id Required for data to post
   * @param qty : Product qty Required for data to post
   * @param element : Product element Required for comeback on case of error
   * @param index : required to return value to original when overpass max stock
   * reduces or frees input number, if it catches an error should come back to the last valid value
   */
  updateProductQty(product: string, quantity: number, element: any, index: any): number {
    const data = { product, quantity } as SimpleLocalProduct;
    if (data.quantity > 0) {
      if (this.authService.isLoggedIn()) {
        this.cartService.updateProductQuantity(data).subscribe(_ => {
          this.quantities.at(index).get('quantity')?.patchValue(quantity);
          element.quantity = quantity;
          this.updateSubtotal();
          this.coreService.getCartNumber();
          this.alertService.open({type: 'success', message: 'Cantidad de producto actualizada correctamente'});
        }, error => {
          this.quantities.at(index).get('quantity')?.patchValue(this.quantities.at(index).get('maxQty')?.value);
          element.quantity = this.quantities.at(index).get('maxQty')?.value;
          this.alertService.open({type: 'error', message: 'Sobrepasa la disponibilidad del inventario del producto'});
          this.updateSubtotal();
        });
      } else {
        this.cartService.updateFakeProductQty(data).subscribe(_ => {
          this.quantities.at(index).get('quantity')?.patchValue(quantity);
          element.quantity = quantity;
          this.updateSubtotal();
          this.localStorageHandler.setProduct(data.product, data.quantity);
          this.coreService.getCartNumber();
          this.alertService.open({type: 'success', message: 'Cantidad de producto actualizada correctamente'});
        }, error => {
          this.quantities.at(index).get('quantity')?.patchValue(this.quantities.at(index).get('maxQty')?.value);
          element.quantity = this.quantities.at(index).get('maxQty')?.value;
          this.alertService.open({type: 'error', message: 'Sobrepasa la disponibilidad del inventario del producto'});
        });
      }
    } else {
      this.alertService.open({type: 'error', message: 'La cantidad no puede ser menor o igual a 0'});
    }

    return element.quantity;
  }

  /**
   * Routers page to product search
   */
  goToProductSearch(): void {
    this.router.navigate(['/product/search']);
  }

}
