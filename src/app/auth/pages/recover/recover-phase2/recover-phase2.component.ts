import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordStrengthValidator } from 'src/app/auth/helper/passwordValidator';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-recover-phase2',
  templateUrl: './recover-phase2.component.html',
  styleUrls: ['./recover-phase2.component.scss']
})
export class RecoverPhase2Component implements OnInit {
  token = '';
  repeatPass = false;
  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]),
    rePassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token || '';
  }

  get password(): FormControl { return this.loginForm.get('password') as FormControl; }
  get rePassword(): FormControl { return this.loginForm.get('rePassword') as FormControl; }

  sendNewPass(): void { 
    this.loginForm.markAllAsTouched();
    if (this.password?.value !== this.rePassword?.value) {
      this.repeatPass = true;
    } else if (this.loginForm.status === 'VALID') {
      this.authService.confirmPassword(this.token, this.password?.value).subscribe(resp => {
        this.alertService.open({type: 'success', message: 'Se cambió la contraseña con éxito.'});
        this.router.navigate(['auth']);
      }, error => { 
        this.alertService.open({type: 'error', message: 'No se logró hacer el cambio.'});
      });
    } else {
      this.alertService.open({type: 'warning', message: 'No olvides escribir todos los datos'});
    }
  }
}
