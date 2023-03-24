import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { ServerResponse } from 'src/interfaces/server-response';
import { BaseService } from 'src/app/shared/services/base.service';
import { DEFAUTL_ROUTE_WRONG, AUTOPARTES_AUTH_REFRESH_TOKEN, AUTOPARTES_AUTH_TOKEN, TokenResponse } from '../interfaces/token-response';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/shared/services/alert.service';
import format from 'src/app/shared/utils/format-helper';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Subject<User | undefined> = new Subject();
  logged: Subject<boolean> = new Subject();

  constructor(
    private base: BaseService,
    private router: Router,
    private cookieService: CookieService,
    private alertService: AlertService) { }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logout(): boolean {
    this.removeTokens();
    return this.isLoggedIn();
  }

  login(username: string, password: string, redirect?: string): Observable<boolean> {
    return this.base.post('user_module/login/', { username, password })
      .pipe(
        tap(tokens => {
          this.storeTokens(tokens.data[0]);
          this.getUser();
          if (redirect) {
            window.location.href = redirect;
          }
        }),
        mapTo(true),
        catchError(error => {
          this.alertService.open({ type: 'error', message: 'Credenciales inválidas, revísalas y vuelve a intentar' });
          return of(false);
        })
      );
  }

  // First step of registration
  verifyUserExistence(phone_number: string): Observable<any> {
    const url = format({ phone_number });
    return this.base.get(`user_module/register/buyer/${url}`);
  }

  // Second step for registration
  getUserVerifictionToken(phoneNumber: string): Observable<ServerResponse<any>> {
    return this.base.post(`user_module/sms_user/`, { phone_number: phoneNumber });
  }
  // Third step for registration
  finalVerification(verifyId: string, verifyToken: string, phoneNumber: string): Observable<ServerResponse<any>> {
    return this.base.post(`user_module/sms_verify/`, {
      verify_id: verifyId,
      verify_token: verifyToken,
      phone_number: phoneNumber
    });
  }

  getUser(): Observable<ServerResponse<User>> {
    return this.base.get('user_module/user/').pipe(
      tap(response => {
        if (response.data.seller && !response.data.seller_onboarding) {
          this.alertService.open({type: 'warning', message: 'Termina tu proceso de registro'});
          this.reDoOnboardingProcess().subscribe(resp => {
            window.location.href = resp.data;
          });
        }
        this.user$.next(response.data);
      })
    );
  }

  reDoOnboardingProcess(): Observable<ServerResponse<any>> {
    return this.base.get(`user_module/register/seller/account_refresh/`);
  }

  // Last step for registration
  register(form: any): Observable<boolean> {
    return this.base.put('user_module/register/buyer/', form)
      .pipe(
        tap(tokens => {
          this.storeTokens(tokens.data);
          this.getUser();
        }),
        mapTo(true),
        catchError((error) => {
          this.alertService.open({ type: 'error', message: error.error.message });
          return of(false);
        })
      );
  }

  // Recover password send email
  recoverPassword(email: string): Observable<ServerResponse<any>> {
    return this.base.post(`user_module/password_reset/`, { email });
  }

  // Confirms password
  confirmPassword(token: string, password: string): Observable<ServerResponse<any>> {
    const body = { token, password };
    return this.base.post(`user_module/password_reset/confirm/`, body);
  }


  refreshToken(): Observable<TokenResponse> {
    return this.base.post('auth/token/refresh/', {
      refresh: this.getRefreshToken()
    }).pipe(
      catchError(error => {
        this.removeTokens();
        this.router.navigate([DEFAUTL_ROUTE_WRONG]);
        return throwError(error);
      }),
      tap((tokens) => {
        this.storeTokens(tokens);
      })
    );
  }

  verifyToken(token: string): any {
    return this.base.post('auth/token/', { access: token });
  }

  private getRefreshToken(): any {
    return this.cookieService.get(AUTOPARTES_AUTH_REFRESH_TOKEN);
  }

  getAccessToken(): any {
    return this.cookieService.get(AUTOPARTES_AUTH_TOKEN);
  }

  private storeTokens(tokens: TokenResponse): void {
    this.cookieService.set(AUTOPARTES_AUTH_TOKEN, tokens.token || tokens.access, undefined, '/', environment.cookieDomain);
    this.cookieService.set(AUTOPARTES_AUTH_REFRESH_TOKEN, tokens.refresh || '', undefined, '/', environment.cookieDomain);
    this.logged.next(true);
  }

  removeTokens(): void {
    this.cookieService.deleteAll('/', environment.cookieDomain);
    this.cookieService.delete(AUTOPARTES_AUTH_TOKEN, '/', environment.cookieDomain);
    this.cookieService.delete(AUTOPARTES_AUTH_REFRESH_TOKEN, '/', environment.cookieDomain);
    this.logged.next(false);
  }
}
