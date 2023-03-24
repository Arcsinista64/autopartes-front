import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import format from 'src/app/shared/utils/format-helper';
import { BaseService } from 'src/app/shared/services/base.service';
import { Product, ProductDetail, SmallProduct } from '../interfaces/product';
import { ServerResponse, SubServerResponse } from 'src/interfaces/server-response';
import { InputSelectCategories, InputSelectSubcategories } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private base: BaseService) { }

  getProductDetails(product_id: string): Observable<ServerResponse<[ProductDetail]>> {
    return this.base.get(`product_module/product_listing/${product_id}/`);
  }

  getProducts(filters?: any): Observable<ServerResponse<SubServerResponse<Product[]>>> {
    const url = filters ? format(filters) : '';
    return this.base.get(`product_module/product_listings/${url}`);
  }
  
  // When search return zero results
  getAllRecommendedProducts(search?: string): Observable<ServerResponse<SubServerResponse<Product[]>>> {
    return this.base.get(`product_module/product_listings/recommended/${search}/`);
  }

  sendProductToCart(product: string, quantity: number): Observable<ServerResponse<any>> {
    const body = {product, quantity};
    return this.base.post(`order_module/cart/`, body);
  }

  getAllCategories(): Observable<ServerResponse<InputSelectCategories[]>> {
    return this.base.get('product_module/categories/');
  } 

  getAllSubCategories(): Observable<ServerResponse<InputSelectSubcategories[]>> {
    return this.base.get('product_module/subcategories/');
  }

  getBrands(): Observable<ServerResponse<any[]>> {
    return this.base.get('product_module/brands/');
  }
  
  getProductConditions(): Observable<ServerResponse<any[]>> {
    return this.base.get('product_module/product_conditions/');
  }

  sendSuggestion(data: any): Observable<ServerResponse<any>> {
    return this.base.post(`product_module/product_search_form/`, data);
  }
  
  sendQuestion(data: any): Observable<ServerResponse<any>> {
    return this.base.post(`notifications_module/question/`, data);
  }
}
