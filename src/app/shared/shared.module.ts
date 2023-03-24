import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { OfferTagComponent } from './components/offer-tag/offer-tag.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { MultiselectComponent } from './components/multiselect/multiselect.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { StarsGradesComponent } from './components/stars-grades/stars-grades.component';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { PaymentStripeComponent } from './components/payment-stripe/payment-stripe.component';
import { NgxStripeModule } from 'ngx-stripe';
import { TitleComponent } from './components/title/title.component';
import { AlertService } from './services/alert.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecommendedProductsComponent } from './components/recommended-products/recommended-products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DynamicTableComponent,
    MultiselectComponent,
    SelectComponent,
    ProductCardComponent,
    OfferTagComponent,
    WhishlistComponent,
    StarsGradesComponent,
    InputComponent,
    ModalComponent,
    ProductCardComponent,
    UploadFilesComponent,
    PaymentStripeComponent,
    TitleComponent,
    AlertComponent,
    PageLoaderComponent,
    NotFoundComponent,
    RecommendedProductsComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    NgxStripeModule.forRoot(environment.publicStripeID),
  ],
  exports: [
    ButtonComponent,
    ProductCardComponent,
    OfferTagComponent,
    WhishlistComponent,
    DynamicTableComponent,
    MultiselectComponent,
    SelectComponent,
    StarsGradesComponent,
    InputComponent,
    ModalComponent,
    ProductCardComponent,
    UploadFilesComponent,
    PaymentStripeComponent,
    TitleComponent,
    PageLoaderComponent,
    NotFoundComponent,
    RecommendedProductsComponent,
    AlertComponent
  ],
  entryComponents: [AlertComponent],
  providers: [
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }
  ]
})
export class SharedModule { }
