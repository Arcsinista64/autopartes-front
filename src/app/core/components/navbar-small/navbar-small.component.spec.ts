import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { NavbarSmallComponent } from './navbar-small.component';

describe('NavbarSmallComponent', () => {
  let component: NavbarSmallComponent;
  let fixture: ComponentFixture<NavbarSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSmallComponent  ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule, 
        MaterialModule],
        providers:[ProductCatalogComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set state and emit closed, when calling chageState', () => {
  //   const spy = spyOn(component.closed, 'emit');
  //   component.changeState();
  //   fixture.detectChanges();

  //   expect(component.state).toEqual('closed');
  //   expect(spy).toHaveBeenCalledOnceWith('closed');
  // });

});
