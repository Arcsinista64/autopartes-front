import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogComponent } from '../product-catalog/product-catalog.component';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule
      ],
      declarations: [ CategoriesComponent ],
      providers:[ProductCatalogComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should simulate onchange select event to null', () => {
    const event = [ { value: [] } ];
    component.filterSubcategories(event)
    expect(component.selectedCategory).toBe(null);
  });

  it('should filter by letter A, X, Y, Z', () => {
    expect(component.filterByAlphabet(65) === "A").toBeTruthy();
    expect(component.filterByAlphabet(88) === "X").toBeTruthy();
    expect(component.filterByAlphabet(89) === "Y").toBeTruthy();
    expect(component.filterByAlphabet(90) === "Z").toBeTruthy();
  });
});
