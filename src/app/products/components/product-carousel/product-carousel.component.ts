import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { LoadScriptsService } from 'src/app/shared/services/load-scripts.service';
import { customOptions } from 'src/app/shared/interfaces/carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ModalComponent;

  @Input() slides!: any;

  selected!: string;
  index: number = 0;
  default = "../../../../assets/default-image.jpg"

  customOptions: OwlOptions = {
    loop: false,
    margin:24,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    stagePadding: 0,
    rewind: false,
    autoplayHoverPause: true,
    navText: ['&#60', '&#62'], //buttons, text, icons, etc
    responsive: {
    },
    nav: true
}

  constructor(
    private loadScripts: LoadScriptsService
  ) {
    loadScripts.load(['zoom', 'script']);
  }

  ngOnInit(): void {
    this.selected = this.slides[0];
  }
  ngOnDestroy(): void {
  }
  select(index: number): void {
    this.selected = this.slides[index];
    this.index = index;
  }
  plusle(): void {
    if(this.index < this.slides.length-1) { 
      this.index++;
      this.selected = this.slides[this.index];
    }
  }
  minus(): void {
    if(this.index > 0) { 
      this.index--;
      this.selected = this.slides[this.index];
    }
  }
}
