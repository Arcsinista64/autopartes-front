import { OwlOptions } from 'ngx-owl-carousel-o';

//More information for this library (owlcarousel2): https://owlcarousel2.github.io/OwlCarousel2/
//customOptions: https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
export const customOptions: OwlOptions = {
    loop: false,
    margin:24,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    stagePadding: 0,
    rewind: true,
    autoplayHoverPause: true,
    navText: ['&#60', '&#62;'], //buttons, text, icons, etc
    responsive: {
      0: {
        items: 1 
      },
      250: {
        items: 2
      },
      600: {
        items: 4
      },
      900: {
        items: 4
      }
    },
    nav: true
}