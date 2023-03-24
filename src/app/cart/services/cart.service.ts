import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/interfaces';
import { BaseService } from 'src/app/shared/services/base.service';
import { SimpleLocalProduct } from 'src/app/shared/services/local-storage-handler.service';
import { ServerResponse } from 'src/interfaces/server-response';
import { Product } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private base: BaseService) { }

  getAllProducts(): Observable<ServerResponse<Cart<Product[]>>> {
    return this.base.get(`order_module/cart/`);
  }

  getAllFakeProducts(products: SimpleLocalProduct[]): Observable<ServerResponse<any>> {
    return this.base.post(`order_module/public/cart/`, { products });
  }

  getProduct(id: any): Observable<ServerResponse<Product>> {
    return this.base.get(`product_module/seller/product_listing/${id}/`);
  }

  updateProductQuantity(body: any): Observable<ServerResponse<Product>> {
    return this.base.put(`order_module/cart/`, body);
  }

  updateFakeProductQty(product: SimpleLocalProduct): Observable<ServerResponse<any>> {
    return this.base.put(`order_module/public/cart/`, product);
  }

  deleteProduct(product?: string): Observable<ServerResponse<unknown>> {
    return this.base.deleteWithBody(`order_module/cart/`, { product });
  }

  getDefaults(): Observable<ServerResponse<any>> {
    return this.base.get('user_module/buyer/checkout/');
  }

  makePayment(body?: any): Observable<ServerResponse<any>> {
    return this.base.post(`order_module/order/`, body);
  }

  getShippingQuotation(): Observable<ServerResponse<any>> {
    return this.base.get(`order_module/quote_delivery/`);
  }

  verifyCoupon(couponid: string): Observable<ServerResponse<any>> {
    return this.base.get(`order_module/coupon/?coupon=${couponid}/`);
  }

  saveOXXOLink(orderid: string, url: string): Observable<ServerResponse<any>> {
    return this.base.put(`order_module/buyer/order/${orderid}/oxxo/`, {url});
  }

}
