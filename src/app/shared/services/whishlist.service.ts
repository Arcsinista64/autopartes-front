import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from 'src/interfaces/server-response';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  constructor(private base: BaseService) { }

  add(product: string): Observable<ServerResponse<any>> {
    return this.base.post(`product_module/wishlist/`, {product});
  }

  remove(product: string): Observable<ServerResponse<any>> {
    return this.base.deleteWithBody(`product_module/wishlist/`, {product});
  }
}
