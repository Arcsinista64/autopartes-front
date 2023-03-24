import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from 'src/interfaces/server-response';
import { InputSelectCategories, InputSelectSubcategories } from '../interfaces/interfaces';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  constructor(private base: BaseService) { }

  getAllCountries(): Observable<ServerResponse<any[]>> {
    return this.base.get('catalog/countries/');
  }

  getAllStates(id?: number): Observable<any> {
    const url = id ? `?countries=${id}` : '';
    return this.base.get(`catalog/states`+url);
  }

  getAllMunicipalities(countryId?: number, stateId?: number): Observable<any>{
    let url = '?';
    if (countryId) { url += `countries=${countryId}`; }
    if (stateId) { url += `&states=${stateId}`; }
    return this.base.get(`catalog/municipalities`+url);
  }

  getAllCategories(): Observable<ServerResponse<InputSelectCategories[]>> {
    return this.base.get('product_module/categories/');
  }

  getAllSubCategories(): Observable<ServerResponse<InputSelectSubcategories[]>> {
    return this.base.get('product_module/subcategories/');
  }

  getAllLandingInfo(): Observable<ServerResponse<any>> {
    return this.base.get('catalog/landing/');
  }

  getAllNews(): Observable<ServerResponse<any>> {
    return this.base.get('blog_module/blogs/');
  }

  getNewDetail(id: string): Observable<ServerResponse<any>> {
    return this.base.get(`blog_module/blog/${id}/`);
  }

  getAllOffers(): Observable<ServerResponse<any>> {
    return this.base.get('');
  }

  getAllFeaturedProducts(): Observable<ServerResponse<any>> {
    return this.base.get('');
  }
}
