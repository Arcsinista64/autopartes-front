import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyAcountService } from 'src/app/my-acount/services/my-acount.service';
import { PaymentStripeComponent } from 'src/app/shared/components/payment-stripe/payment-stripe.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FixturesService } from 'src/app/shared/services/fixtures.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shipment-info',
  templateUrl: './shipment-info.component.html',
  styleUrls: ['./shipment-info.component.scss']
})
export class ShipmentInfoComponent implements OnInit {
  @Input() shipmentCompaniesData = [];
  @Input() shipmentCompaniesPrices = [];
  @Output() openCheckoutConfirmation: EventEmitter<{
    shipment_companies_data: any,
    shipment_companies_prices: any,
    enviaPrices: any,
    oxxo: boolean
   }> = new EventEmitter();

  /** OXXO */
  oxxoShow = false;
  /*Total-card section*/
  checkoutSubtotal = 0;
  checkoutShipmentPrice = 0;
  checkoutDiscount = 0;
  checkoutTotal = 0;
  enviaCost = 0;

  loading = false;

  /*Address section*/
  countries$!: Observable<any>;
  states$!: Observable<any>;
  municipalities$!: Observable<any>;

  /*Address section*/
  countriesFiscal$!: Observable<any>;
  statesFiscal$!: Observable<any>;
  municipalitiesFiscal$!: Observable<any>;

  countryid = 158;
  fiscalCountryid = 158;

  addressID = '';

  addressForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]), // TODO Validations
    address: new FormControl('', Validators.required),
    ext: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    int: new FormControl('', /*Validators.pattern('^[0-9]*$')*/), // Remove validation?
    neighborhood: new FormControl('', Validators.required),
    country: new FormControl(158, Validators.required),
    state: new FormControl('', Validators.required),
    municipality: new FormControl('', Validators.required),
    postal_code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    references: new FormControl('', Validators.required),
  });
  get name(): FormControl { return this.addressForm.get('name') as FormControl; }
  get phone_number(): FormControl { return this.addressForm.get('phone_number') as FormControl; }
  get address(): FormControl { return this.addressForm.get('address') as FormControl; }
  get ext(): FormControl { return this.addressForm.get('ext') as FormControl; }
  get int(): FormControl { return this.addressForm.get('int') as FormControl; }
  get neighborhood(): FormControl { return this.addressForm.get('neighborhood') as FormControl; }
  get country(): FormControl { return this.addressForm.get('country') as FormControl; }
  get state(): FormControl { return this.addressForm.get('state') as FormControl; }
  get municipality(): FormControl { return this.addressForm.get('municipality') as FormControl; }
  get postal_code(): FormControl { return this.addressForm.get('postal_code') as FormControl; }
  get references(): FormControl { return this.addressForm.get('references') as FormControl; }

  fiscalAddressID = '';

  facturationAddressForm = new FormGroup({
    facturation_name: new FormControl('', Validators.required),
    facturation_phone_number: new FormControl('',
      [Validators.required, Validators.maxLength(10), Validators.minLength(10)]
    ),
    facturation_address: new FormControl('', Validators.required),
    facturation_ext: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    facturation_int: new FormControl('', /*Validators.pattern('^[0-9]*$')*/), // Remove validation?
    facturation_neighborhood: new FormControl('', Validators.required),
    facturation_country: new FormControl(158, Validators.required),
    facturation_state: new FormControl('', Validators.required),
    facturation_municipality: new FormControl(0, Validators.required),
    facturation_postal_code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    facturation_references: new FormControl('', Validators.required),
  });

  get facturation_name(): FormControl { return this.facturationAddressForm.get('facturation_name') as FormControl; }
  get facturation_phone_number(): FormControl { return this.facturationAddressForm.get('facturation_phone_number') as FormControl; }
  get facturation_address(): FormControl { return this.facturationAddressForm.get('facturation_address') as FormControl; }
  get facturation_ext(): FormControl { return this.facturationAddressForm.get('facturation_ext') as FormControl; }
  get facturation_int(): FormControl { return this.facturationAddressForm.get('facturation_int') as FormControl; }
  get facturation_neighborhood(): FormControl { return this.facturationAddressForm.get('facturation_neighborhood') as FormControl; }
  get facturation_country(): FormControl { return this.facturationAddressForm.get('facturation_country') as FormControl; }
  get facturation_state(): FormControl { return this.facturationAddressForm.get('facturation_state') as FormControl; }
  get facturation_municipality(): FormControl { return this.facturationAddressForm.get('facturation_municipality') as FormControl; }
  get facturation_postal_code(): FormControl { return this.facturationAddressForm.get('facturation_postal_code') as FormControl; }
  get facturation_references(): FormControl { return this.facturationAddressForm.get('facturation_references') as FormControl; }

  radioButton = '0';
  crumbData: any = [];

  // PAYMENT SECTION
  stripeToken = '';
  paymentAddress: any;
  @ViewChild('stripeInfo') stripeInfo?: PaymentStripeComponent;

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private fixtureService: FixturesService,
    private myAcountService: MyAcountService,
  ) { }
  shipmentPrice = 0;
  ngOnInit(): void {
    this.getCountries();
    this.getStates();
    this.getMunicipalities();
    this.getStatesFiscal();
    this.getMunicipalitiesFiscal();
    this.setAddresses();
    this.crumbData = [
      {txt: 'Carrito', url: '/checkout/cart'},
      {txt: 'Confirmación de pedido', url: '/checkout/information'},
    ];
  }

  getCountries(): void {
    this.countries$ = this.fixtureService.getAllCountries().pipe(
      map(res => res.data ));
    this.countriesFiscal$ = this.countries$;
  }

  getStates(countryid?: any): void {
    if (countryid) {
      this.countryid = countryid;
    }
    this.states$ = this.fixtureService.getAllStates(countryid).pipe(
      map(res => res.data ));
  }

  getMunicipalities(stateid?: any): void {
    this.municipalities$ = this.fixtureService.getAllMunicipalities(this.countryid, stateid).pipe(
      map(res => res.data ));
  }

  getStatesFiscal(countryid?: any): void {
    if (countryid) {
      this.fiscalCountryid = countryid;
    }
    this.statesFiscal$ = this.fixtureService.getAllStates(countryid).pipe(
      map(res => res.data ));
  }

  getMunicipalitiesFiscal(stateid?: any): void {
    this.municipalitiesFiscal$ = this.fixtureService.getAllMunicipalities(this.fiscalCountryid, stateid).pipe(
      map(res => res.data ));
  }

  setUpAddress(address: any): void {
    this.addressID = address.id;
    this.addressForm.patchValue({
      ...address,
      ext: address.ext_number,
      int: address.int_number,
      address: address.street,
      references: address.reference,
      country: address.country.id,
      state: address.state.id,
      municipality: address.municipality.id
    });
  }

  setAddresses(): void {
    this.cartService.getDefaults().subscribe(res => {
      if (res.success) {
        const address = res.data[0].default_address;
        if (address) {
          this.setUpAddress(address);
          if (!address?.fiscal_address) {
            const fiscalAddress = res.data[0].default_payment_method;
            this.fiscalAddressID = fiscalAddress?.id;
          }
        }
        // Iterates all prices to create a sum for shipping
        this.checkoutShipmentPrice = this.shipmentCompaniesPrices.reduce((sum: any, current: any) => sum + current, 0);

        this.checkoutShipmentPrice += res.data[0].envia_quote_total;
        this.enviaCost = res.data[0].envia_quote_total;
        this.checkoutSubtotal = res.data[0]?.subtotal || 0;
        this.checkoutTotal = res.data[0]?.total || 0;
      }
    }, error => {
      // Expected error if user doesn't have any checkout information (address and payment)
    });
  }


  radioChange(id: string): void {
    const e = document.getElementById(id);
    e?.scrollIntoView({block: 'center', behavior: 'smooth'});
  }

  postAddress(): void {
    this.addressForm.markAllAsTouched();

    const aux = this.radioButton === '1';

    const addressData: any = {
      name: this.name.value,
      street: this.address.value,
      phone_number: this.phone_number.value,
      ext_number: this.ext.value,
      int_number: this.int.value,
      neighborhood: this.neighborhood.value,
      country: this.country.value,
      state: this.state.value,
      postal_code: this.postal_code.value,
      reference: this.references.value,
      municipality: this.municipality.value,
      delivery_default: true,
      fiscal_address: aux,
      delivery_address: true,
    };

    if (this.radioButton === '0') {
      this.setCardAddress(addressData);
    }

    if (this.addressForm.valid) {
      if (this.addressID !== '') {
        this.myAcountService.updateAddress(this.addressID, addressData).subscribe(_ => {
          if (!this.oxxoShow) {
            this.savePaymentMethod();
          } else {
            this.sendData();
          }
        }, err => {
          this.alertService.open(
            {type: 'error', message: 'Hubo un error al actualizar sus dirección fiscal, revise sus datos y vuelva a intentar'}
          );
        });
      } else {
        this.myAcountService.addAddress(addressData).subscribe(_ => {
          if (!this.oxxoShow) {
            this.savePaymentMethod();
          } else {
            this.sendData();
          }
        },
          error => {
            this.alertService.open({type: 'error', message: error.error.message});
          }
        );
      }
    } else {
      this.alertService.open(
        {type: 'error', message: 'Hubo un error al actualizar sus dirección de envio, revise sus datos y vuelva a intentar'}
      );
    }
  }

  postFiscalAddress(): void {
    this.facturationAddressForm.markAllAsTouched();
    const fiscalAddressData = {
      name: this.facturation_name.value,
      street: this.facturation_address.value,
      phone_number: this.facturation_phone_number.value,
      ext_number: this.facturation_ext.value,
      int_number: this.facturation_int.value,
      neighborhood: this.facturation_neighborhood.value,
      country: this.facturation_country.value,
      state: this.facturation_state.value,
      municipality: this.facturation_municipality.value,
      postal_code: this.facturation_postal_code.value,
      delivery_default: false,
      fiscal_address: true,
      delivery_address: true,
      reference: this.facturation_references.value
    };

    this.setCardAddress(fiscalAddressData);

    if (this.facturationAddressForm.valid) {
      if (this.fiscalAddressID !== '') {
        this.myAcountService.updateAddress(this.fiscalAddressID, fiscalAddressData).subscribe(_ => {
          this.postAddress();
        }, err => {
          this.loading = false;
          this.alertService.open(
            {type: 'error', message: 'Hubo un error al actualizar sus dirección fiscal, revise sus datos y vuelva a intentar'}
          );
        });
      } else {
        this.myAcountService.addAddress(fiscalAddressData).subscribe(_ => {
          this.postAddress();
        },
          error => {
            this.loading = false;
            this.alertService.open(
              {type: 'error', message: 'Hubo un error al actualizar sus dirección fiscal, revise sus datos y vuelva a intentar'}
            );
          }
        );
      }
    }
  }

  setCardAddress(addressToBeSet: any): void {
    this.paymentAddress = {
      ...addressToBeSet,
      facturation_address: addressToBeSet.street
    };
  }

  createPaymentAddressObj(addressLine1: any, addressLine2: any): any {
    if (this.paymentAddress.int_number !== '') {
      return {
        street: addressLine1,
        ext_number: this.paymentAddress.ext_number,
        int_number: this.paymentAddress.int_number,
        neighborhood: addressLine2,
        municipality: this.paymentAddress.municipality,
        state: this.paymentAddress.state,
        country: this.paymentAddress.country,
        postal_code: this.paymentAddress.postal_code
      };
    } else {
      return {
        street: addressLine1,
        ext_number: this.paymentAddress.ext_number,
        int_number: null,
        neighborhood: addressLine2,
        municipality: this.paymentAddress.municipality,
        state: this.paymentAddress.state,
        country: this.paymentAddress.country,
        postal_code: this.paymentAddress.postal_code
      };
    }
  }

  savePaymentMethod(): void {
    this.stripeInfo?.createToken();
    const addressLine1 = this.paymentAddress.street?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    + ' #'
    + this.paymentAddress.ext_number  || '';
    const addressLine2 = this.paymentAddress.neighborhood || '';
    this.myAcountService.addPaymentMethod(this.stripeToken, true, this.createPaymentAddressObj(addressLine1, addressLine2)).subscribe(_ => {
      this.loading = false;
      this.alertService.open({ type: 'success', message: 'La información se guardo los datos con éxito' });
      this.sendData();
    },
      error => {
        this.loading = false;
        this.alertService.open({type: 'error', message: 'No se logró guardar el método de pago, intente más tarde.'});
      }
    );
  }

  /**
   * Uses outpot to send new data to fill total tables in checkout component
   */
  sendData(): void {
    this.openCheckoutConfirmation.emit({
      shipment_companies_data: this.shipmentCompaniesData || [],
      shipment_companies_prices: this.shipmentCompaniesPrices || [],
      enviaPrices: this.enviaCost || 0,
      oxxo: this.oxxoShow
    });
  }

  nextStep(): void {
    this.loading = true;
    if (this.radioButton === '0' || this.oxxoShow) {
      this.addressForm.markAllAsTouched();
      if (this.addressForm.valid) {  // Validator for address form
        if (!this.stripeToken && !this.oxxoShow) { // Validator for type of payment
          this.loading = false;
          this.alertService.open({type: 'warning', message: 'Favor de llenar todo el formulario'});
          return;
        }
        this.postAddress();
      } else {
        this.loading = false;
        this.alertService.open({type: 'warning', message: 'Favor de llenar todo el formulario'});
      }
    } else {
      this.facturationAddressForm.markAllAsTouched();
      if (this.facturationAddressForm.valid && this.addressForm.valid ) {  // Validator for addresses form
        if (!this.stripeToken && !this.oxxoShow) { // Validator for type of payment
          this.loading = false;
          this.alertService.open({type: 'warning', message: 'Favor de llenar todo el formulario'});
          return;
        }
        this.postFiscalAddress();
      } else {
        this.loading = false;
        this.alertService.open({type: 'warning', message: 'Favor de llenar todo el formulario'});
      }
    }
  }
}

