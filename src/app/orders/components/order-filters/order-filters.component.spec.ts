import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { CoreModule } from 'src/app/core/core.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { TitleComponent } from 'src/app/shared/components/title/title.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrderFiltersComponent } from './order-filters.component';

describe('OrderFiltersComponent', () => {
  let component: OrderFiltersComponent;
  let fixture: ComponentFixture<OrderFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, OverlayModule, SharedModule, CoreModule, FormsModule],
      declarations: [ OrderFiltersComponent],
      providers: [ ProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
