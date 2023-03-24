import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyAcountService } from '../../services/my-acount.service';

import { WhishlistComponent } from './whishlist.component';

describe('WhishlistComponent', () => {
  let component: WhishlistComponent;
  let service: MyAcountService;
  let fixture: ComponentFixture<WhishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        SharedModule,
        RouterTestingModule,
        CoreModule,
        BrowserAnimationsModule
      ],
      declarations: [ WhishlistComponent ],
      providers: [ ProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should spy send product to Cart', () => {
  //   component.sendToCart('123456789');
  //   const spy = spyOn(service, 'addToCart');
  //   component.sendToCart('123456789');

  //   expect(spy).toHaveBeenCalled();
  // });
  
  // it('should open delete modal', () => {
  //   const spy = spyOn(component.modalDeleteRef, 'openModal');
  //   component.openDelete('');
  //   expect(spy).toHaveBeenCalled();
  // });
  
  // it('should close delete modal', () => {
  //   const spy = spyOn(component.modalDeleteRef, 'hideModal');
  //   component.closeDelete();
  //   expect(spy).toHaveBeenCalled();
  // });
  
  it('should to set id to confirm deletion with that id', () => {
    component.id_toDelete = "any-id-123456798564";
    component.confirmDelete('any-id');            //confirm deletion from modal
    component.confirmDelete();                    //confirm deletion from sendToCart
   
    expect(component.id_toDelete === "any-id-123456798564").toBeTruthy();
  });


});
