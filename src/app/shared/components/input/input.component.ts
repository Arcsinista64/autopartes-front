import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() label!: string;
  @Input() icon!: string;
  @Input() placeholder!: string;
  @Input() maxLength!: number;
  @Input() material = false;
  @Input() type = 'text';

  @Input() formCtr = new FormControl();

  @Output() iconAction = new EventEmitter<any>();
  @Output() changeVal = new EventEmitter<any>();

  inputValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  sendAction(): void {
    this.iconAction.emit();
  }

  onChange(event?: any): void {
    this.changeVal.emit(this.inputValue);
  }
}
