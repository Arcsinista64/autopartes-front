import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FixturesService } from 'src/app/shared/services/fixtures.service';
import { MyAcountService } from '../../services/my-acount.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {

  addresses$!: Observable<any>;
  countries$!: Observable<any>;
  states$!: Observable<any>;
  municipalities$!: Observable<any>;

  municipality$ = new Subscription();

  @ViewChild('modal') modalRef!: ModalComponent;
  @ViewChild('modalDelete') modalDeleteRef!: ModalComponent;

  addressForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone_number: new FormControl('',
      [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]
    ),
    street: new FormControl('', Validators.required),
    ext_number: new FormControl('', [Validators.required]),
    int_number: new FormControl(''),
    neighborhood: new FormControl('', Validators.required),
    country: new FormControl(158, Validators.required),
    state: new FormControl('', Validators.required),
    municipality: new FormControl('', Validators.required),
    postal_code: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    reference: new FormControl('', Validators.required),
    delivery_default: new FormControl(false),
    delivery_address: new FormControl(''),
    fiscal_address: new FormControl('')
  });

  get name(): FormControl { return this.addressForm.get('name') as FormControl; }
  get phone_number(): FormControl { return this.addressForm.get('phone_number') as FormControl; }
  get street(): FormControl { return this.addressForm.get('street') as FormControl; }
  get ext_number(): FormControl { return this.addressForm.get('ext_number') as FormControl; }
  get int_number(): FormControl { return this.addressForm.get('int_number') as FormControl; }
  get neighborhood(): FormControl { return this.addressForm.get('neighborhood') as FormControl; }
  get country(): FormControl { return this.addressForm.get('country') as FormControl; }
  get state(): FormControl { return this.addressForm.get('state') as FormControl; }
  get municipality(): FormControl { return this.addressForm.get('municipality') as FormControl; }
  get postal_code(): FormControl { return this.addressForm.get('postal_code') as FormControl; }
  get reference(): FormControl { return this.addressForm.get('reference') as FormControl; }
  get delivery_default(): FormControl { return this.addressForm.get('delivery_default') as FormControl; }
  get delivery_address(): FormControl { return this.addressForm.get('delivery_address') as FormControl; }
  get fiscal_address(): FormControl { return this.addressForm.get('fiscal_address') as FormControl; }

  modal_title = 'Editar dirección';
  address_id: string | null = null;
  editMode = false;
  default = false;
  crumbData: any = [];

  constructor(
    private myAcountService: MyAcountService,
    private fixtureService: FixturesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.getAddresses();
    this.getStates();
    this.getMunicipalities();

    this.municipality$ = this.state.valueChanges.subscribe(resp => {
      this.getMunicipalities(resp);
    });

    this.crumbData = [
      {txt: 'Mi cuenta', url: '/account'}, 
      {txt: 'Direcciones', url: '/account/addresses'}, 
    ];
  }

  getAddresses(): void {
    this.addresses$ = this.myAcountService.getAllAddresses().pipe(
      map(res => res.data));
  }

  getCountries(): void {
    this.countries$ = this.fixtureService.getAllCountries().pipe(
      map(res => res.data));
  }

  getStates(country?: number): void {
    this.states$ = this.fixtureService.getAllStates(158).pipe(
      map(res => res.data));
  }

  getMunicipalities(state?: number): void {
    this.municipalities$ = this.fixtureService.getAllMunicipalities(158, state).pipe(
      map(res => res.data));
  }

  openAddAddress(title: string): void {
    this.modal_title = title;
    this.editMode = false;
    this.addressForm.reset();
    this.address_id = null;
    this.modalRef.openModal();
    this.preloadMexico();
  }

  defaultChange(event: boolean): void {
    this.delivery_default.patchValue(event);
  }

  /**
   * DELETE MODAL FUNCTIONS
   */
  openDelete(id: any): void {
    this.modalDeleteRef.openModal();
    this.address_id = id;
  }

  closeDeleteModal(): void {
    this.modalDeleteRef.hideModal();
  }

  confirmDelete(id: string): void {
    const ans = confirm('¿Está seguro de eliminar la dirección?');

    if (ans) {
      this.myAcountService.deleteAddress(id).subscribe(
        _ => {
          // this.modalDeleteRef.hideModal();
          this.alertService.open({ type: 'success', message: 'La dirección se guardó con éxito' });
          // this.ngOnInit();
          this.getAddresses();
        },
        error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al borrar tu dirección, vuelve a intentar más tarde'});
        }
      );
    }
    // const id = this.address_id ? this.address_id : '';
  }

  /**
   * UPDATE MODAL
   */
  getAddressInfo(title: string, id: string): void {
    this.address_id = id;
    this.modal_title = title;
    this.editMode = true;

    this.myAcountService.getAddress(id).subscribe(
      res => {
        this.preloadData(res.data);
        this.modalRef.openModal();
      },
      error => {
        this.alertService.open({type: 'error', message: 'Hubo un error al obtener la dirección, por favor intente más tarde'});
      }
    );
  }

  preloadMexico(): void { 
    this.addressForm.get('country')?.disable();
    this.addressForm.patchValue({
      country: 158,
    });
  }

  preloadData(address: any): void {
    this.default = address.delivery_default;
    this.default ? this.delivery_default.patchValue(true) : '';
    this.addressForm.patchValue({
      ...address,
      int_number: address.int_address || '', // receive
      country: address.country.id, // FIX:
      state: address.state.id, // FIX:
      municipality: address.municipality.id,
    });
  }

  sendAddress(): void {
    this.addressForm.markAllAsTouched();

    if (this.addressForm.valid) {
      const data: any = {
        ...this.addressForm.value,
        country: this.country.value,
        state: this.state.value,
        municipality: this.municipality.value,
        delivery_default: this.delivery_default.value || false,
        fiscal_address: false,
        delivery_address: true,
      };
      this.editMode ? this.updateAddress(data) : this.addNewAddress(data);
    }
  }

  addNewAddress(data: any): void {
    if (this.addressForm.valid) {
      this.myAcountService.addAddress(data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Se agregó la dirección con éxito' });
        this.modalRef.hideModal();
        window.location.reload();
      },
        error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al agregar la dirección, por favor intente más tarde'});
        }
      );
    }
  }

  updateAddress(data: any): void {
    if (this.addressForm.valid) {
      this.myAcountService.updateAddress(this.address_id, data).subscribe(_ => {
        this.alertService.open({ type: 'success', message: 'Se actualizó la dirección con éxito' });
        this.modalRef.hideModal();
        window.location.reload();
      },
        error => {
          this.alertService.open({type: 'error', message: 'Hubo un error al actualizar la dirección, por favor intente más tarde'});
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.municipality$.unsubscribe();
  }

}
