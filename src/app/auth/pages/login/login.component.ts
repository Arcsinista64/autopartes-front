import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  redirectUrl: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  crumbData: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirect');
    this.crumbData = [
      {txt: 'Iniciar sesión', url: '/auth'}, 
    ];
  }

  get email(): any { return this.loginForm.get('email'); }
  get password(): any { return this.loginForm.get('password'); }

  login(): void {
    this.email.markAsDirty();
    this.password.markAsDirty();
    if (!this.loginForm.valid) { return; }
    const email = this.email.value.toLowerCase();
    const password = this.password.value;
    const redirect = this.redirectUrl || '';
    this.authService.login(email, password, redirect).subscribe(loggedIn => {
      if (loggedIn) {
        this.alertService.open({ type: 'success', message: 'Inicio de sesión con éxito' });
        this.router.navigate(['account']);
      }
    });
  }

}
