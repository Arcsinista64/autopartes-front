import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-stripe',
  templateUrl: './payment-stripe.component.html',
  styleUrls: ['./payment-stripe.component.scss']
})
export class PaymentStripeComponent implements OnInit {
  @Input() address?: any;
  @Output() tokenBuyer = new EventEmitter<any>();
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;
  cardStatus = false;
  error_message_card = '';
  expiredStatus = false;
  error_message_expired = '';
  cvvStatus = false;
  error_message_cvv = '';
  nameStatus = false;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: 'red',
        color: '#31325F',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '17px',
      },
    },
  };
  form = new Subscription();

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  paymentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name(): FormControl { return this.paymentForm.get('name') as FormControl; }

  constructor(private stripeService: StripeService) { }

  ngOnInit(): void {
    this.form = this.paymentForm.valueChanges.subscribe(resp => {
      if (this.paymentForm.valid) {
        this.nameStatus = true;
        this.callToken();
      } else {
        this.nameStatus = false;
      }
    });
  }

  createToken(): void {
    const name = this.name?.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // const address_line1 = this.address?.street.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + ' #' + this.address?.number  || '';
    const address_line1 = this.address?.facturation_address.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + ' #' + this.address?.ext  || '';
    const address_line2 = this.address?.neighborhood || '';
    const address_city = this.address?.municipality?.name || '';
    const address_state = this.address?.state?.name || '';
    const address_zip = this.address?.postal_code.toString() as string || '';
    const address_country = 'MX';
    const currency = 'MXN';

    this.stripeService.createToken(
      this.card.element,
      {
        name,
        address_line1,
        address_line2,
        address_city,
        address_state,
        address_zip,
        address_country,
        currency
      }).subscribe(result => {
      if (result.token) {
        this.tokenBuyer.emit(result.token.id);
      }
    });
  }

  onChangeCard(ev: any): void {
    if (ev.complete) {
      this.cardStatus = true;
      this.callToken();
    } else {
      this.error_message_card = 'Revisa el número de la tarjeta o intenta con una tarjeta diferente.';
      this.cardStatus = false;
    }
  }

  onChangeExp(ev: any): void {
    if (ev.complete) {
      this.expiredStatus = true;
      this.callToken();
    } else {
      this.error_message_expired = 'Revisa la fecha de vencimiento o intenta con una tarjeta diferente.';
      this.expiredStatus = false;
    }
  }

  onChangeCVV(ev: any): void {
    if (ev.complete) {
      this.cvvStatus = true;
      this.callToken();
    } else {
      this.error_message_cvv = 'Revisa el código o utiliza una tarjeta diferente.';
      this.cvvStatus = false;
    }
  }

  callToken(): void {
    if (this.cardStatus && this.expiredStatus && this.cvvStatus && this.nameStatus) {
      this.createToken();
    }
  }

}