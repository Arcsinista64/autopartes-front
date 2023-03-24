import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { InputSelectCategories, InputSelectSubcategories } from '../interfaces/interfaces';
import { ServerResponse } from 'src/interfaces/server-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private base: BaseService) { }

  getAllCategories(): Observable<ServerResponse<InputSelectCategories[]>> {
    return this.base.get('product_module/categories/');
  }

  getAllSubCategories(): Observable<ServerResponse<InputSelectSubcategories[]>> {
    return this.base.get('product_module/subcategories/');
  }
  
}
