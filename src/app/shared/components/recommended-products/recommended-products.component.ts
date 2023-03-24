import { Component, Input, OnInit } from '@angular/core';
import { customOptions } from '../../interfaces/carousel';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.scss']
})
export class RecommendedProductsComponent implements OnInit {

  customOptions = customOptions;

  @Input() data!: any;
  @Input() title: string = 'Productos relacionados';

  constructor() { }

  ngOnInit(): void {
  }

}
