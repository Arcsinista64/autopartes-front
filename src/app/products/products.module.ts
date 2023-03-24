import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from './components/review/review.component';
import { ProductQuestionComponent } from './components/product-question/product-question.component';
import { ProductComponent } from './product.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { MaterialModule } from '../material/material.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CoreModule } from '../core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SuggestionsFormComponent } from './pages/suggestions-form/suggestions-form.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [
    ProductDetailComponent, 
    ProductCarouselComponent, 
    ReviewComponent, 
    ProductQuestionComponent, 
    ProductComponent, 
    ProductCatalogComponent,
    CategoriesComponent,
    SuggestionsFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    NgxPaginationModule,
    MaterialModule,
    CoreModule,
    NgxImageZoomModule,
    CarouselModule
  ],
  exports: [
    ReviewComponent
  ]
})
export class ProductsModule { }
