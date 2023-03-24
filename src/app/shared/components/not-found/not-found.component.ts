import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() description?: string;
  @Input() action?: string;
  @Output() activated: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAction(): void {
    this.activated.emit();
  }

}
