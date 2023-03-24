import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ErrorHandlingInterceptor } from './error-handling.interceptor';

describe('ErrorHandlingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      OverlayModule
    ],
    providers: [
      ErrorHandlingInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: ErrorHandlingInterceptor = TestBed.inject(ErrorHandlingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
