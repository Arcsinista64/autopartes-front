import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { CoreModule } from '../core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RegistrationComponent } from './pages/registration/registration.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { RecoverPhase1Component } from './pages/recover/recover-phase1/recover-phase1.component';
import { RecoverPhase2Component } from './pages/recover/recover-phase2/recover-phase2.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AuthComponent, 
    LoginComponent,
    RegistrationComponent,
    VerificationComponent,
    RecoverPhase1Component, 
    RecoverPhase2Component,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AuthModule { }
