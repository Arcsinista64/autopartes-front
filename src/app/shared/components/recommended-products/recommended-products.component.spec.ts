import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../../shared.module';
import { TitleComponent } from '../title/title.component';

import { RecommendedProductsComponent } from './recommended-products.component';

describe('RecommendedProductsComponent', () => {
  let component: RecommendedProductsComponent;
  let fixture: ComponentFixture<RecommendedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        MaterialModule,
      ],
      providers: [],
      declarations: [ RecommendedProductsComponent,SearchSmallComponent, TitleComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
