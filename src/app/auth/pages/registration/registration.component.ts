import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DEFAULT_ROUTE_SUCCESS, DEFAUTL_ROUTE_WRONG } from '../../interfaces/token-response';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PasswordStrengthValidator } from '../../helper/passwordValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnInit {
  title = 'Registro';
  url = '';

  verificationId = '';
  verification = false;

  repeatError = false;
  generalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), PasswordStrengthValidator]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6), PasswordStrengthValidator])
  });

  get name(): FormControl { return this.generalForm.get('name') as FormControl; }
  get phone_number(): FormControl { return this.generalForm.get('phone_number') as FormControl; }
  get email(): FormControl { return this.generalForm.get('email') as FormControl; }
  get password(): FormControl { return this.generalForm.get('password') as FormControl; }
  get password_confirmation(): FormControl { return this.generalForm.get('password_confirmation') as FormControl; }

  crumbData: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.whereTo();
    this.crumbData = [
      {txt: 'Registro de usuario', url: '/auth'},
    ];
  }

  whereTo(): void {
    if (this.route.snapshot.queryParams.checkout === 'true') {
      this.title = 'Mi perfil';
      this.url = '/checkout/cart/';
    } else {
      this.url = DEFAULT_ROUTE_SUCCESS;
    }
  }

  /**
   * Validates if user´s does not exists already
   * If it doesn't creates a new token
   */
  verifyUserExistence(): void {
    this.generalForm.markAllAsTouched();
    if (this.password.value !== this.password_confirmation.value) {
      this.repeatError = true;
    } else if (this.generalForm.status === 'VALID') {
      this.authService.verifyUserExistence(this.phone_number.value).subscribe(
        resp => {
          this.alertService.open({type: 'error', message: 'El teléfono ya esta registrado a un usuario.' });
        },
        errorResp => { this.getUserVerificationToken(); },
      );
    } else { this.alertService.open({type: 'warning', message: 'Por favor verifica todos los datos'}); }
  }

  /**
   * Generates user verification token with phone number
   */
  getUserVerificationToken(): void {
    this.authService.getUserVerifictionToken(this.phone_number.value).subscribe(resp => {
      this.verificationId = resp.data; // Verify Answer
      this.verification = true;
    },
    errorResp => {
      this.alertService.open({type: 'error', message: errorResp.error.message });
    });
  }

  /**
   * Last verifications for phone number
   * @param verificationToken Verification number
   */
  finalVerification(verificationToken: any): void {
    if (verificationToken && this.phone_number.status === 'VALID') {
      this.authService.finalVerification(this.verificationId, verificationToken, this.phone_number.value).subscribe(
        resp => { this.register(); },
        errorResp => {
          this.alertService.open({type: 'error', message: errorResp.error.message});
        }
      );
    }
  }

  /**
   * Once the phone number is verify,thgis functioins registers the buyer
   */
  register(): void {
    const data = {
      ...this.generalForm.value,
      verify_id: this.verificationId,
      email: this.email.value.toLowerCase()
    };
    this.authService.register(data).subscribe(loggedIn => {
      this.alertService.open({type: 'success', message: 'Usuario registrado con éxito'});
      if (loggedIn) {
        this.router.navigate(['/account']);
      } else {
        this.router.navigate(['/auth/register']);
      }
    });
  }
}
