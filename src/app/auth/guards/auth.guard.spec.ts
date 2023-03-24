import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';



describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let base: BaseService;
  let route: Router;
  let coockieService: CookieService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, OverlayModule]
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  //Expected 4 arguments, but got 3.
  // it('should canActivate', () => {
  //   authService = new AuthService(base, route, coockieService)
  //   authGuard = new AuthGuard(authService, route);

  //   const spy = spyOn(authGuard, 'canActivate');

  //   fakeAsync(() => {
  //     expect(spy).toEqual(false);
  //     expect(route.navigate).toHaveBeenCalledWith(['/']);
  //   });
  // });

});
