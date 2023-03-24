import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DEFAULT_ROUTE_WRONG_ACCESS } from '../interfaces/token-response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, private router: Router) {}
  /**
   * Intercepts a request and checks for access token. If a request fails authentication,
   * a refresh is attempted with the access token.
   * @param request The current intercepted request
   * @param next The HttpHandler that continues the request lifecycle
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken());
    }
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (error.url?.includes('auth/token/refresh')) {
          this.authService.removeTokens();
          this.router.navigate([DEFAULT_ROUTE_WRONG_ACCESS]);
        }
        return this.handleAuthError(request, next);
      }
      return throwError(error);
    }));
  }

  /**
   * Sets the authorization header in the request.
   * @param request The current request
   * @param token The access JWT
   */
  private addToken(request: HttpRequest<unknown>, token: string): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  /**
   * Handles an authentication error by attempting a JWT refresh.
   * @param request The current request
   * @param next The HttpHandler that continues the request lifecycle
   */
  private handleAuthError(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(token => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.refresh);
          return next.handle(this.addToken(request, token.access));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
