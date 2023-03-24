import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/cart/interfaces/cart';
import { BaseService } from 'src/app/shared/services/base.service';
import { ServerResponse, SubServerResponse } from 'src/interfaces/server-response';
import { Address } from '../interfaces/my-acount';

@Injectable({
  providedIn: 'root'
})
export class MyAcountService {

  constructor(private base: BaseService) { }

  // Buyer
  getBuyer(): Observable<any> {
    return this.base.get('user_module/buyer/');
  }

  updateBuyer(data: any): Observable<any> {
    return this.base.put('user_module/buyer/', data);
  }

  // Address
  getAllAddresses(): Observable<ServerResponse<Address[]>> {
    return this.base.get('user_module/addresses/');
  }

  addAddress(body: any): Observable<ServerResponse<Address>> {
    return this.base.post(`user_module/address/`, body);
  }

  updateAddress(id: any, body: any): Observable<ServerResponse<Address>> {
    return this.base.put(`user_module/address/${id}/`, body);
  }

  getAddress(id: any): Observable<ServerResponse<Address>> {
    return this.base.get(`user_module/address/${id}/`);
  }

  deleteAddress(id?: string): Observable<ServerResponse<Address>> {
    return this.base.delete(`user_module/address/${id}/`);
  }

  /**
   * Whishlist ↓
   */
  getWhishlist(filter?: string): Observable<ServerResponse<any>> {
    const url = filter ? `?product_name=${filter}` : '';
    return this.base.get(`product_module/wishlist/${url}`);
  }

  getProduct(id: any): Observable<ServerResponse<any>> {
    return this.base.get(`product_module/product_listing/${id}/`);
  }

  addToCart(body: any): Observable<ServerResponse<Product>> {
    return this.base.post(`order_module/cart/`, body);
  }

  deleteProduct(id?: any): Observable<ServerResponse<unknown>> {
    return this.base.deleteWithBody(`product_module/wishlist/`, { product: id });
  }

  /**
   * Payment information ↓
   */
  getTransactions(): Observable<ServerResponse<SubServerResponse<any[]>>> {
    return this.base.get(`order_module/buyer/payments/`);
  }
  getPaymentMethods(): Observable<ServerResponse<any[]>> {
    return this.base.get(`user_module/payment_methods/`);
  }
  getPaymentMethod(paymentId: string): Observable<ServerResponse<any>> {
    return this.base.get(`user_module/payment_method/${paymentId}/`);
  }
  addPaymentMethod(token: string, isDefault: boolean, address: any): Observable<ServerResponse<any>> {
    return this.base.post(`user_module/payment_method/`, { token, default: isDefault, address });
  }
  editPaymentMethod(paymentId: string, token: string, isDefault: boolean): Observable<ServerResponse<any>> {
    return this.base.put(`user_module/payment_method/${paymentId}/`, { token, default: isDefault });
  }
  deletePaymentMethod(paymentId: string): Observable<ServerResponse<any>> {
    return this.base.delete(`user_module/payment_method/${paymentId}/`);
  }
}
