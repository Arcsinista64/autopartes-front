import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatRippleModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatRippleModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  providers: []
})
export class MaterialModule { }
