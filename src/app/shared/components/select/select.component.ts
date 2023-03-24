import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() margin = '40px';

  @Input() label = '';
  @Input() data!: any;
  @Input() placeholder = '';
  @Input() showLabel: boolean = false;
  @Input() displayLabel: boolean = true;
  @Input() searchPlaceholder: string = 'Escribe aquí lo que buscas';

  @Input() selected: any;
  @Input() displayKey = 'viewValue';
  @Input() selectKey = 'value';

  @Input() disableReset = false;

  @Input() formGrp: FormGroup = new FormGroup({
    value: new FormControl()
  }); // Recieves the formgroup used by father
  @Input() formCtr = 'value'; // Name of the form control

  @ViewChild('matSelect') matSelect!: MatSelect;

  hideLabel: boolean = true;
  filterText = '';
  dataBackup: any;

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.dataBackup = this.data;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue !== changes.data.previousValue) {
      this.data = changes.data.currentValue;
      this.dataBackup = this.data;
    }
  }

  /**
   * Filters mat-select options by user's typing
   */
  filterFunc(): void {
    if (this.filterText !== '') {
      this.dataBackup = this.data.filter(
        (op: any) => op[this.displayKey].toString().toLowerCase().includes(this.filterText.toLowerCase())
      );
    } else {
      this.dataBackup = this.data;
    }
  }

  /**
   * Resets mat-select options but does not reset mat-select selected options
   */
  resetFilterOptions(): void {
    this.filterText = '';
    this.dataBackup = this.data;
  }

  /**
   * Resets mat-select even selected options
   */
  resetFilters(ev: Event): void {
    ev.stopPropagation();
    this.formGrp.get(this.formCtr)?.patchValue('');
    this.resetFilterOptions();
    this.hideLabel = true;
  }

  change() { 
    this.hideLabel = false;
  }
}
