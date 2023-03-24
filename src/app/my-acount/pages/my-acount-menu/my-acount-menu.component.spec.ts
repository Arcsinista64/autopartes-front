import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAcountMenuComponent } from './my-acount-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { CoreModule } from 'src/app/core/core.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('MyAcountMenuComponent', () => {
  let component: MyAcountMenuComponent;
  let fixture: ComponentFixture<MyAcountMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, OverlayModule, CoreModule, BrowserAnimationsModule],
      declarations: [ MyAcountMenuComponent ],
      providers: [ ProductCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAcountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
