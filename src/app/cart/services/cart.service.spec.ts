import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
      });
      service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  // it('should be updated quantity of products', () => {
  //   const data = [
  //     {
  //         quantity: 1,
  //         product: [
  //           {
  //             price: "500.00"
  //           }
  //         ],
  //     }
  //   ];
  //   service.updateProductQuantity('', data);
  //   expect(service.updateProductQuantity('', data)).toHaveBeenCalled();
  // });
  
  // it('should get products', () => {
  //   service.getAllProducts();
  //   expect(service.getAllProducts()).toHaveBeenCalled();
  // });
  
  // it('should delete products by id', () => {
  //   service.deleteProduct('');
  //   expect(service.deleteProduct('')).toHaveBeenCalled();
  // });


});
