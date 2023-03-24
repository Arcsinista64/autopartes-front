import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingService } from '../../services/landing.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  crumbData: any = [];

  helpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
    message: new FormControl('', Validators.required)
  });

  get name(): FormControl { return this.helpForm.get('name') as FormControl; }
  get email(): FormControl { return this.helpForm.get('email') as FormControl; }
  get phone_number(): FormControl { return this.helpForm.get('phone_number') as FormControl; }
  get message(): FormControl { return this.helpForm.get('message') as FormControl; }

  constructor(
    private landingService: LandingService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.crumbData = [
      {txt: 'Ayuda', url: '/help'}, 
    ];
  }

  sendMessage() { 
    this.name.markAsDirty();
    this.email.markAsDirty();
    this.phone_number.markAsDirty();
    this.message.markAsDirty();
    if (this.helpForm.valid) {
      this.landingService.sendHelpForm(this.helpForm.value).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Se envió con éxito' });
        this.name.patchValue('');
        this.email.patchValue('');
        this.phone_number.patchValue('');
        this.message.patchValue('');
        this.helpForm.markAsPristine();
      },
        error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al enviar el formulario, por favor intente más tarde'});
        }
      );
    }
  }
}
