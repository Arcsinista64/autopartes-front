import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyAcountService } from '../../services/my-acount.service';

import { AddressesComponent } from './addresses.component';

describe('AddressesComponent', () => {
  let component: AddressesComponent;
  let fixture: ComponentFixture<AddressesComponent>;
  let service: MyAcountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule
      ],
      declarations: [
        AddressesComponent, ModalComponent, SearchSmallComponent
      ],
      providers: [ ProductCatalogComponent ]
    })
      .compileComponents();
    service = TestBed.inject(MyAcountService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.addressForm.patchValue({
      name: 'test',
      phone_number: 'test',
      street: 'test',
      ext_number: 'test',
      int_number: 'test',
      neighborhood: 'test',
      country: 'test',
      state: 'test',
      municipality: 'test',
      postal_code: '123123',
      reference: 'test',
      delivery_default: 'test',
      delivery_address: 'test',
      fiscal_address: 'test',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should open delete modal', () => {
  //   const spy = spyOn(component.modalDeleteRef, 'openModal');
  //   component.openDelete('');
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should close delete modal', () => {
  //   const spy = spyOn(component.modalDeleteRef, 'hideModal');
  //   component.closeDeleteModal();
  //   expect(spy).toHaveBeenCalled();
  // });



  // it('should open Add address modal', () => {
  //   component.openAddAddress('Agregar dirección');
  //   expect(component.modal_title === 'Agregar dirección').toBeTruthy();
  // });

  // it('should send data on editmode and !editMode ', () => {
  //   component.editMode = true;
  //   const spy = spyOn(component, 'updateAddress');
  //   component.sendAddress();
  //   expect(spy).toHaveBeenCalled();

  //   component.editMode = false;
  //   const spy2 = spyOn(component, 'addNewAddress');
  //   component.sendAddress();
  //   expect(spy2).toHaveBeenCalled();
  // });

  // it('should set edit mode when getAddressInfo', () => {
  //   component.getAddressInfo('Actualizar dirección', '');
  //   expect(component.editMode).toBeTruthy();
  // });

  // //ADD NEW ADDRESS
  // it('should add new Address', fakeAsync(() => {
  //   const response: any = {
  //     data: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'addAddress').and.returnValue(of(response));
  //   component.openAddAddress('Agregar');

  //   component.addressForm.patchValue({
  //     name: 'test',
  //     phone_number: 'test',
  //     street: 'test',
  //     ext_number: 'test',
  //     int_number: 'test',
  //     neighborhood: 'test',
  //     country: 'test',
  //     state: 'test',
  //     municipality: 'test',
  //     postal_code: '123123',
  //     reference: 'test',
  //     delivery_default: 'test',
  //     delivery_address: 'test',
  //     fiscal_address: 'test',
  //   });
    
  //   component.addNewAddress(component.addressForm.value);
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));

  // it('should try add new Address but catch error', fakeAsync(() => {
  //   const response: any = {
  //     data: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'addAddress').and.returnValue(throwError(ErrorEvent));
  //   component.addNewAddress(component.addressForm.value);
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));
  
  // //UPDATE
  // it('should update Address', fakeAsync(() => {
  //   const response: any = {
  //     data: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'updateAddress').and.returnValue(of(response));
  //   component.openAddAddress('Actualizar');

  //   component.addressForm.patchValue({
  //     name: 'test',
  //     phone_number: 'test',
  //     street: 'test',
  //     ext_number: 'test',
  //     int_number: 'test',
  //     neighborhood: 'test',
  //     country: 'test',
  //     state: 'test',
  //     municipality: 'test',
  //     postal_code: '123123',
  //     reference: 'test',
  //     delivery_default: 'test',
  //     delivery_address: 'test',
  //     fiscal_address: 'test',
  //   });

  //   component.updateAddress(component.addressForm.value);
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));

  // it('should try update Address but catch error', fakeAsync(() => {
  //   const response: any = {
  //     data: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'updateAddress').and.returnValue(throwError(ErrorEvent));
  //   component.updateAddress(component.addressForm.value);
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));

  // //DELETE AND CLOSE MODAL
  // it('should close delete modal when click on confirm button and call delete service', fakeAsync(() => {
  //   const response: any = {
  //     deleteProduct: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'deleteAddress').and.returnValue(of(response));
  //   component.openDelete('');
  //   component.confirmDelete();
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));

  // it('should try close delete modal when click on confirm button and call delete service  but catch error', fakeAsync(() => {
  //   const response: any = {
  //     deleteProduct: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'deleteAddress').and.returnValue(throwError(ErrorEvent));
  //   component.openDelete('');
  //   component.confirmDelete();
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));

  // //GET INFORMATION: TypeError: Cannot read property 'int_address' of undefined
  // // it('should get Address info', fakeAsync(() => {
  // //   const response: any = {
  // //     preloadData: () => of(['']),
  // //   };
  // //   let spy = spyOn(service, 'getAddress').and.returnValue(of(response));
  // //   // component.openAddAddress('Actualizar');
  // //   component.getAddressInfo('Actualizar', 'test');
  // //   tick();
  // //   expect(spy).toHaveBeenCalled();
  // // }));

  // it('should try get Address info but catch error', fakeAsync(() => {
  //   const response: any = {
  //     preloadData: () => of(['']),
  //   };
  //   let spy = spyOn(service, 'getAddress').and.returnValue(throwError(ErrorEvent));
  //   // component.openAddAddress('Actualizar');
  //   component.getAddressInfo('Actualizar', 'test');
  //   tick();
  //   expect(spy).toHaveBeenCalled();
  // }));
});
