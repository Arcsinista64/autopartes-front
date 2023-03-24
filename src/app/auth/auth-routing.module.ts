import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RecoverPhase1Component } from './pages/recover/recover-phase1/recover-phase1.component';
import { RecoverPhase2Component } from './pages/recover/recover-phase2/recover-phase2.component';
import { VerificationComponent } from './pages/verification/verification.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'recovery',
        component: RecoverPhase1Component
      },
      {
        path: 'password/change/:token',
        component: RecoverPhase2Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
