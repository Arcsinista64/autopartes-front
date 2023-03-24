import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductsComponent } from './featured-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FeaturedProductsComponent', () => {
  let component: FeaturedProductsComponent;
  let fixture: ComponentFixture<FeaturedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, OverlayModule, CoreModule, SharedModule],
      declarations: [ FeaturedProductsComponent ],
      providers: [ ProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
