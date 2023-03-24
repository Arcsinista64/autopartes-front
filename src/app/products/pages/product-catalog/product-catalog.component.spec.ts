import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog.component';
import { CoreModule } from 'src/app/core/core.module';

describe('ProductCatalogComponent', () => {
  let component: ProductCatalogComponent;
  let fixture: ComponentFixture<ProductCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule, 
        BrowserAnimationsModule,
        SharedModule,
        NgxSliderModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ ProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide FilterPanel ', () => {
    component.filter_panel == false;
    component.showHideFilterPanel()
    expect(component.filter_panel == true).toBeTruthy();

    component.filter_panel == true;
    component.showHideFilterPanel()
    expect(component.filter_panel == false).toBeTruthy();
  });

});
