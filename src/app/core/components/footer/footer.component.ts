import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  about_us_list = [
    {
      text: 'Contáctanos',
      url: 'contact-us'
    },
    {
      text: 'Formas de pago',
      url: 'payment-methods'
    }
  ];

  reports = [
    {
      text: 'Decodifica tu VIN',
      url: 'decode',
    },
    {
      text: 'Políticas de privacidad',
      url: '',
    },
    {
      text: 'Términos y condiciones',
      url: '',
    },
  ];

  subscriptionForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  get email(): FormControl { return this.subscriptionForm.get('email') as FormControl; }
  
  constructor() { }

  ngOnInit(): void {
  }

  sendSubscription(): void {
    this.email.markAsDirty();
    if(this.subscriptionForm.valid) {
    }
  }
  
}
