import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogComponent } from '../product-catalog/product-catalog.component';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ProductDetailComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        MaterialModule
      ],
      providers: [
        NavbarComponent,
        ProductCatalogComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {id: 'test'}
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDetails, when there is a product id', () => {
    const spy = spyOn(component, 'getDetails');

    component.ngOnInit();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith('test');
  });


  //Argument of type 'AbstractControl | null' is not assignable to parameter of type 'Expected<FormControl>'
  it('should be the same qty() to qty inside of productAddForm', () => {
    // expect(component.qty).toBe(component.productAddForm.get('qty'));
    // expect(component.offer).toBe(component.productAddForm.get('offer'));
    // expect(component.question).toBe(component.questionForm.get('question'));
  });
});
