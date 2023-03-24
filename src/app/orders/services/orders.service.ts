import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Observable } from 'rxjs';
import { ServerResponse, SubServerResponse } from 'src/interfaces/server-response';
import { Order, ProductReview, SellerReview } from '../interfaces/orders';
import { Product } from 'src/app/products/interfaces/product';
import format from 'src/app/shared/utils/format-helper';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private base: BaseService) { }

  getAllOrders(filters?: any): Observable<ServerResponse<SubServerResponse<Order[]>>> {
    const url = filters ? format(filters) : '';
    return this.base.get(`order_module/buyer/orders/${url}`);
  }

  getOrder(id: any): Observable<ServerResponse<Order>> {
    return this.base.get(`order_module/buyer/order/${id}/`);
  }

  getProduct(id: string): Observable<ServerResponse<Product>> {
    return this.base.get(`product_module/seller/product_listing/${id}/`);
  }

  addProductReview(body: any): Observable<ServerResponse<ProductReview>> {
    return this.base.post(`order_module/rate/product/`, body);
  }

  addSellertReview(body: any): Observable<ServerResponse<SellerReview>> {
    return this.base.post(`order_module/rate/seller/`, body);
  }

  getOrderStatus(): Observable<ServerResponse<any>> {
    return this.base.get(`order_module/order/status/all/`);
  }

  setDevolution(devolution: {
    name?: string;
    order_product?: any;
    shipping_guide?: any;
    shipping_cost?: any;
    shipping_company?: any;
    reason?: string;
  }): Observable<ServerResponse<any>> {
    return this.base.post(`order_module/buyer/devolution/`, devolution);
  }
  
  getDevolution(id: any): Observable<ServerResponse<any>> {
    return this.base.get(`order_module/buyer/devolution/${id}/`);
  }
}
