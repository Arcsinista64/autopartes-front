import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../../core.module';

import { SearchSmallComponent } from './search-small.component';

describe('SearchSmallComponent', () => {
  let component: SearchSmallComponent;
  let fixture: ComponentFixture<SearchSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSmallComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        OverlayModule,
        CoreModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [ ProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openRoutes', () => {
    component.openRoutes();
    expect(component.close_navbar = 'open').toBeTruthy();
  });

  // it('should openFilters', () => {
  //   component.openFilters();
  //   expect(component.close_filters  = 'open').toBeTruthy();
  // });
});
