import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FixturesService } from 'src/app/shared/services/fixtures.service';

@Component({
  selector: 'app-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss']
})
export class PaymentMethodFormComponent implements OnInit {
  // @Input() paymentMethod: any;
  @Output() submitCard: EventEmitter<any> = new EventEmitter();

  countries$!: Observable<any>;
  states$!: Observable<any>;
  municipalities$!: Observable<any>;
  cardToken: string = '';

  cardForm = new FormGroup({
    // name: new FormControl('', Validators.required),
    // number: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern('^[0-9]*$')]), //TODO: Max 16
    // expiration_date: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\//?([0-9]{2})$')]), // MM/YY
    // cvv: new FormControl('', Validators.required), //TODO: CVV 3 or 4 (AmericanXprss)
    facturation_address: new FormControl('', Validators.required),
    ext: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]), //Only numbers
    int: new FormControl(''),
    neighborhood: new FormControl('', Validators.required),
    country: new FormControl(158, Validators.required),
    state: new FormControl('', Validators.required),
    municipality: new FormControl('', Validators.required),
    postal_code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]), //TODO: MAX 6
  });

  get name() { return this.cardForm.get('name') as FormControl; }
  get number() { return this.cardForm.get('number') as FormControl; }
  get expiration_date() { return this.cardForm.get('expiration_date') as FormControl; }
  get cvv() { return this.cardForm.get('cvv') as FormControl; }
  get facturation_address() { return this.cardForm.get('facturation_address') as FormControl; }
  get ext() { return this.cardForm.get('ext') as FormControl; }
  get int() { return this.cardForm.get('int') as FormControl; }
  get neighborhood() { return this.cardForm.get('neighborhood') as FormControl; }
  get country() { return this.cardForm.get('country') as FormControl; }
  get state() { return this.cardForm.get('state') as FormControl; }
  get municipality() { return this.cardForm.get('municipality') as FormControl; }
  get cp() { return this.cardForm.get('postal_code') as FormControl; }

  default = false;

  constructor(
    private fixtureService: FixturesService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.country.disable();
    // this.getMunicipalities();
    // this.getStates();

    this.country.valueChanges.pipe(
      startWith(158)
    ).subscribe(value => {
      this.getStates(value);
    });

    this.state.valueChanges.pipe(
      startWith(1)
    ).subscribe(value => {
      this.getMunicipalities(this.country.value, value);
    })
  }

  getCountries() {
    this.countries$ = this.fixtureService.getAllCountries().pipe(
      map(res => res.data));
  }

  getStates(countryId?: number) {
    this.states$ = this.fixtureService.getAllStates(countryId).pipe(
      map(res => res.data));
  }

  getMunicipalities(countryId?: number, stateId?: number) {
    this.municipalities$ = this.fixtureService.getAllMunicipalities(countryId, stateId).pipe(
      map(res => res.data));
  }

  setToken(token: string) {
    this.cardToken = token;
  }

  sendCardForm() {
    this.cardForm.markAllAsTouched();
    if (this.cardForm.valid && this.cardToken) {
      const address_line1 = this.cardForm.value?.facturation_address.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + ' #' + this.cardForm.value?.ext  || '';
      const address_line2 = this.cardForm.value?.neighborhood || '';
      this.submitCard.emit({
        token: this.cardToken,
        default: this.default,
        address: {
          street: address_line1,
          neighborhood: address_line2,
          municipality: this.municipality.value,
          state: this.state.value,
          country: this.country.value,
          postal_code: this.cp.value,
          ext_number: this.ext.value,
          int_number: this.int.value
        }
      });
    }
  }

}
