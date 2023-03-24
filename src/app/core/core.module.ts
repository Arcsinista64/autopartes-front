import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarSmallComponent } from './components/navbar-small/navbar-small.component';
import { SearchSmallComponent } from './components/search-small/search-small.component';
import { MaterialModule } from '../material/material.module';
import { FiltersComponent } from './components/filters/filters.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarSmallComponent,
    SearchSmallComponent,
    FiltersComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSliderModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FiltersComponent,
    SearchSmallComponent,
    FooterComponent,
    BreadcrumbComponent
  ]
})
export class CoreModule { }
