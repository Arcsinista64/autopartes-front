import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-recover-phase1',
  templateUrl: './recover-phase1.component.html',
  styleUrls: ['./recover-phase1.component.scss']
})
export class RecoverPhase1Component implements OnInit {
  sentEmail = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get email(): FormControl { return this.loginForm.get('email') as FormControl; }

  crumbData: any = [];

  constructor(
    private authService: AuthService,
    private alertService: AlertService
    ) { }

    ngOnInit(): void {
      this.crumbData = [
        {txt: 'Iniciar sesión', url: '/auth'}, 
        {txt: 'Recuperación de contraseña', url: '/auth/recovery'}, 
      ];
    }

  recovery(): void {
    if (this.email?.valid) {
      this.authService.recoverPassword(this.email.value.toLowerCase()).subscribe(resp => {
        this.alertService.open({ type: 'success', message: 'Se mandó correctamente' });
        this.sentEmail = false;
      }, error => {
        this.alertService.open({ type: 'error', message: 'No se encontró el usuario, vuelva a intentarlo' });
        this.sentEmail = true;
      });
    } else {
      this.alertService.open({type: 'warning', message: 'No olvides escribir tu correo'});
    }
  }  
}
