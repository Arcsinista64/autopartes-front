import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreService } from 'src/app/core/services/core.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MyAcountService } from '../../services/my-acount.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {

  @ViewChild('modalDelete') modalDeleteRef!: ModalComponent;
  default: string = '../../../../assets/default-image.jpg'
  array_products$!: Observable<any>;
  products$!: Observable<any>;
  products: any = [];
  crumbData: any = [];

  wishlistForm = new FormGroup({
    wishlist_filter: new FormControl('', Validators.required),
  });
  get wishlist_filter(): FormControl { return this.wishlistForm.get('wishlist_filter') as FormControl; }

  displayedColumns = ['img', 'description_price', 'cart_delete'];

  id_toDelete = '';
  filtered: boolean = false;
  filter: string | null = null;
  filtered_length: number = 0;

  constructor(
    private wishlistService: MyAcountService,
    private alertService: AlertService,
    private coreService: CoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getWhishList();
    this.crumbData = [
      {txt: 'Mi cuenta', url: '/account'}, 
      {txt: 'Mis productos favoritos', url: '/account/whishlist'}, 
    ];
  }

  getWhishList(filter?: string): void {
    this.products$ = this.wishlistService.getWhishlist(filter).pipe(
      map(res => {
        filter ? this.filtered = true : this.filtered = false;
        this.filtered_length = res.data.products.length;
        return res.data.products;
      } ));
  }

  sendToCart(id: string): void {
    const data  = {
      product: id,
      quantity: 1
    };

    this.wishlistService.addToCart(data).subscribe(_ => {
      this.confirmDelete(id, true);
      this.getWhishList();
      this.coreService.getCartNumber();
      this.alertService.open({ type: 'success', message: 'Se agregó con éxito' });
    },
      error => {
        this.alertService.open({ type: 'error', message: 'No se logró guardar, por favor intente más tarde' });
      }
    );
  }

  openDelete(id: any): void {
    this.modalDeleteRef.openModal();
    this.id_toDelete = id;
  }

  closeDelete(): void {
    this.modalDeleteRef.hideModal();
  }

  confirmDelete(id?: string, cart?: boolean): void {
    // const id = input_id ? input_id : this.id_toDelete;
    let ans;
    cart ? ans = confirm('¿Enviar el producto al carrito?') : ans = confirm('¿Estás seguro de eliminar el producto?');;
    

    if (ans) {
      this.wishlistService.deleteProduct(id).subscribe(
        _ => {
          this.alertService.open({ type: 'success', message: 'Se eliminó con éxito' });
          // !input_id ? this.modalDeleteRef.hideModal() : '';
          this.getWhishList();
        },
        error => {
          this.alertService.open({ type: 'error', message: 'Hubo un error al eleminar el producto, vuelva a intentar más tarde' });
        }
      );
    }
  }

  applyFilters(event?: any): void{
    if (this.wishlistForm.valid) {
      this.getWhishList(this.wishlist_filter.value);
      this.filter = this.wishlist_filter.value;
    } else {
      this.getWhishList();
    }
  }

  sendToCatalog(): void {
    this.router.navigate(['product', 'search']);
  }
}
