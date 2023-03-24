import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PasswordStrengthValidator } from 'src/app/auth/helper/passwordValidator';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MyAcountService } from '../../services/my-acount.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  user$!: Observable<any>;
  crumbData: any = [];

  generalInfoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}),
    phone: new FormControl({value: '', disabled: true}),
  });
  
  passwordForm = new FormGroup({
    password: new FormControl(null),
    new_password: new FormControl(null, [Validators.minLength(6), PasswordStrengthValidator])
  });

  get name() { return this.generalInfoForm.get('name') as FormControl; }
  get email() { return this.generalInfoForm.get('email') as FormControl; }
  get phone() { return this.generalInfoForm.get('phone') as FormControl; }

  get password() { return this.passwordForm.get('password') as FormControl; }
  get newPassword() { return this.passwordForm.get('new_password') as FormControl; }

  constructor(
    private accountService: MyAcountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUser();
    this.crumbData = [
      {txt: 'Mi cuenta', url: '/account'}, 
      {txt: 'Información de cuenta', url: '/account/information'}, 
    ];
  }

  getUser(): void {
    this.accountService.getBuyer().pipe(map(resp => {
      this.generalInfoForm.patchValue(resp.data);
      return resp.data;
    })).subscribe();
  }

  updateBuyer(): void {
    this.accountService.updateBuyer({
      name: this.name.value,
      password: this.password.value,
      new_password: this.newPassword.value
    }).subscribe(resp => {
      this.alertService.open({type: 'success', message: 'La información de cuenta ha sido actualizada correctamente'});
      this.getUser();
      this.passwordForm.reset();
    }, error => {
      this.alertService.open({type: 'error', message: error.error.message});
    });
  }

}
