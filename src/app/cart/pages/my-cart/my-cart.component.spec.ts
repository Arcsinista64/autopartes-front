import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyCartComponent } from './my-cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/observable/from';
import { ServerResponse } from 'src/interfaces/server-response';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { ProductsModule } from 'src/app/products/products.module';

describe('MyCartComponent', () => {
  let component: MyCartComponent;
  let fixture: ComponentFixture<MyCartComponent>;
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCartComponent, SearchSmallComponent, ProductCatalogComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ProductsModule
      ],
    })
      .compileComponents();
    service = TestBed.inject(CartService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should content four columns', () => {
    component.displayedColumns = ['img', 'description', 'qty', 'price'];
    expect(component.displayedColumns.length === 4).toBeTruthy();
  });

  // it('should add 1 to quantity of element', () => {
  //   const element = { quantity: 1, product: { id: '' } };
  //   component.createProductQuantityItem();
  //   component.plusle(element, 1, 0);

  //   expect(component.quantities.at(0).get('quantity')?.value === 2).toBeTruthy();
  // });

  // it('should subtract 1 to quantity of element', () => {
  //   const element = { quantity: 2 };
  //   component.createProductQuantityItem();
  //   component.minun(element, 0);

  //   expect(component.quantities.at(0).get('quantity')?.value === 1).toBeTruthy();
  // });

  //Expected 0 arguments, but got 1.
  // it('should update subtotal', () => {
  //   const element = [
  //     {
  //       quantity: 1,
  //       product: [
  //         {
  //           price: "500.00"
  //         }
  //       ],
  //     }
  //   ];
  //   component.products = [
  //     {
  //       quantity: 5,
  //       product: [],
  //       cart: 1,
  //       created_at: '',
  //       deleted_at: null,
  //       id: 1,
  //       updated_at: '',
  //       buyer: ''
  //     }
  //   ]
  //   component.updateSubtotal(element);

  //   expect(component.updateSubtotal(element)).toHaveBeenCalled;
  // });

  it('should get a field of FormGroup by index ', () => {
    component.createProductQuantityItem();
    component.quantities.at(0).get('quantity')?.value;
    component.getFormGroupAt(0);
    expect(component.getFormGroupAt(0).value.quantity).toBe('');
  });

  //TODO: 
  // it('should verify if formarray is valid and navigate to checkout ', () => { 
  //   // const spy = spyOn(component.router, 'navigate');
  //   // component.proceedToPayment();
  //   // expect(spy).toHaveBeenCalled;
  // });

  // it('should open delete modal ', () => {
  //   const spy = spyOn(component.modalDeleteRef, 'openModal');
  //   component.openDelete('', 1);
  //   expect(spy).toHaveBeenCalled;
  // });

  // it('should close delete modal', () => {
  //   const spy = spyOn(component.modalDeleteRef, 'hideModal');
  //   component.closeDelete();
  //   expect(spy).toHaveBeenCalled;
  // });

  // it('should confirm delete product and hide modal', () => {
  //   const spy = spyOn(component, 'delete');
  //   const spy2 = spyOn(component.modalDeleteRef, 'hideModal');
  //   component.confirmDelete();
  //   expect(spy).toHaveBeenCalled;
  //   expect(spy2).toHaveBeenCalled;
  // });

  it('should call trackByIndex for dynamic table and return an index', () => {
    expect(component.trackByIndex(5, '') === 5).toBeTruthy();
  });

  //Property 'testSuccess' does not exist on type 'MyCartComponent'
  // it('should delete Products', fakeAsync(() => {
  //   const response: any = {
  //     deleteProduct: () => of(['']),
  //   };
  //   spyOn(service, 'deleteProduct').and.returnValue(of(response));
  //   component.delete('');
  //   tick();
  //   // expect(component.delete).toEqual(response); //Original expect for future references
  //   expect(component.testSuccess).toBeTruthy();
  // }));


  //Property 'testError' does not exist on type 'MyCartComponent'.
  // it('should catch error when try delete Products', fakeAsync(() => {
  //   const error: any = {
  //     deleteProduct: '',
  //   };
  //   spyOn(service, 'deleteProduct').and.returnValue(throwError(cartError));
  //   component.delete('');
  //   expect(component.testError).toBeTruthy();
  // }));

  // it('should get all Products', fakeAsync(() => {
  //   const response: any = {
  //     getAllProducts: () => of([]),
  //   };
  //   spyOn(service, 'getAllProducts').and.returnValue(of(response).pipe(map(res=>res)));
  //   component.getProducts();
  //   tick();
  //   expect(component.products$).toEqual(response); //Original expect for future references
  //   // expect(component.testSuccess).toBeTruthy();
  // }));
});

function cartError(loginError: any): Observable<ServerResponse<unknown>> {
  throw new Error('Function not implemented.');
}

