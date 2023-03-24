import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RequestCacheService } from '../services/request-cache.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCacheService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      const cachedResponse = this.cache.get(request);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next, this.cache);
    }
    return next.handle(request);
  }

  sendRequest(request: HttpRequest<unknown>, next: HttpHandler, cache: RequestCacheService): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(request, event);
        }
      })
    );
  }
}
