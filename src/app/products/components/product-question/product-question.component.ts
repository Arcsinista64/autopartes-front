import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-question',
  templateUrl: './product-question.component.html',
  styleUrls: ['./product-question.component.scss']
})
export class ProductQuestionComponent implements OnInit {
  @Input() question = '';
  @Input() answer = '';
  show = false;

  constructor() { }

  ngOnInit(): void {
  }

}
