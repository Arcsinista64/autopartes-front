import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit, OnChanges {

  @Input() label = '';
  @Input() data!: any;
  @Input() placeholder = '';
  @Input() filter = false;

  @Input() displayKey = 'viewValue';
  @Input() selectKey = 'value';

  @Input() formGrp: FormGroup = new FormGroup({
    value: new FormControl()
  }); // Recieves the formgroup used by father
  @Input() formCtr = 'value'; // Name of the form control

  filterText = '';
  dataBackup: any;
  showResetIcon = false;

  @ViewChild('matSelect') matSelect!: MatSelect;

  constructor() {
  }

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

  getName(item: any): string {
    return (this.data) ? this.data[this.getIndex(item)][this.displayKey] : '';
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
    this.showResetIcon = false;
    this.formGrp.get(this.formCtr)?.patchValue([]);
    this.resetFilterOptions();
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
   * Verifies if the reset icon must be shown
   */

  showIcon(): void {
    this.showResetIcon = (this.formGrp.get(this.formCtr)?.value.length > 0);
  }

  /**
   * Deletes option in mat-select when user clicks on cross
   * @param event Event sent by mat-select
   * @param index index of the item to be delete
   */
  delete(event: Event, index: number): void {
    event.stopPropagation();
    const newArray = this.matSelect.value as Array<string>;
    newArray.splice(index, 1);
    this.formGrp.get(this.formCtr)?.patchValue(newArray);
    this.showIcon();
  }

  /**
   * Get index of param received
   * @param item to find index of
   * @returns position on the data array to be shown in html
   */
  getIndex(item: any): number {
    if (this.data) {
      const newData = this.data.map((o: any) => o[this.selectKey]) as Array<any>;
      const index = newData.indexOf(item);
      return index !== -1 ? index : 0;
    }
    return 0;
  }

}
