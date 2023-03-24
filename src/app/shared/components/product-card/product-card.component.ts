import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() idProduct = '';
  @Input() img: string | null = '';
  @Input() sponsorship = false;
  @Input() name = '';
  @Input() offer = false;
  @Input() actualCost = '';
  @Input() oldCost = '';
  @Input() showWishlist = true;
  @Input() onWishlist = false;


  @Output() data: EventEmitter<{idProduct: string; active: boolean}> = new EventEmitter<{idProduct: string; active: boolean}>();

  default = '../../../../assets/default-image.jpg';

  constructor() { }

  ngOnInit(): void { }

  routing(): void {
    window.location.href = 'product/detail/' + this.idProduct + '/';
  }

}