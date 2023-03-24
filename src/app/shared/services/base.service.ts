import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private _http : HttpClient) { }

  /**
   * Base get call
   * @param path - Path to call
   * @returns An Observable of the response from the server
   */
  get(path: string): Observable<any> {
    return this._http.get<any>(environment.apiEndpoint + path);
  }

  post(url: string, body: any): Observable<any> {
    return this._http.post<any>(environment.apiEndpoint + url, body);
  }

  put(url: string, body: any): Observable<any> {
    return this._http.put(environment.apiEndpoint + url, body);
  }

  delete(url: string): Observable<any> {
    return this._http.delete(environment.apiEndpoint + url);
  }

  deleteWithBody(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body
    };
    return this._http.delete(environment.apiEndpoint + url, httpOptions);
  }
}
