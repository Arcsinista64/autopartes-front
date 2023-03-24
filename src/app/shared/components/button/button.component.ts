import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() icon = '';
  @Input() theme = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = 'Enviando información';

  constructor() { }

  ngOnInit(): void {
  }

}
