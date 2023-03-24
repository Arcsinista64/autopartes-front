import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const maxAge = 30000;
@Injectable({
  providedIn: 'root'
})
export class RequestCacheService {
  cache = new Map();

  constructor() { }

  get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    // const isExpired = cached.lastRead < (Date.now() - maxAge);
    // const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
