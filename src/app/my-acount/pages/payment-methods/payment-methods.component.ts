import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { map } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { MyAcountService } from '../../services/my-acount.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaymentMethodsComponent implements OnInit {
  editablePaymentMethod: any = null;
  @ViewChild('modal') modalRef!: ModalComponent;

  displayedColumns = ['termination', 'default', 'date'];

  paymentMethods$!: Observable<any>;
  transactions$!: Observable<any>;

  emptyTable = true;

  crumbData: any = [];
  activeRow: boolean[] = [];

  isExpansionDetailRow = (index: any, row: any) => row.hasOwnProperty('detailRow');

  constructor(
    private accountService: MyAcountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getPaymentMethods();
    this.getTransactions();
    this.crumbData = [
      {txt: 'Mi cuenta', url: '/account'},
      {txt: 'Métodos de pago', url: '/account/payments'},
    ];
  }

  getPaymentMethods(): void {
    this.paymentMethods$ = this.accountService.getPaymentMethods().pipe(map(resp => {
      this.emptyTable = (resp.data.length <= 0);
      return resp.data;
    }));
  }

  getTransactions(): void {
    this.transactions$ = this.accountService.getTransactions().pipe(map(resp => resp.data.page_data));
  }

  open(index: number): void {
    this.activeRow[index] = !this.activeRow[index];
  }

  openAddCard(): void {
    this.modalRef.openModal();
  }

  // edit(paymentMethod: any): void {
  //   this.editablePaymentMethod = paymentMethod;
  //   this.modalRef.openModal();
  // }

  deletePaymentMethod(id: string): void {
    const ans = confirm('Estás a punto de borrar un método de pago ¿Continuar?');

    if (ans) {
      this.accountService.deletePaymentMethod(id).subscribe(resp => {
        this.alertService.open({type: 'success', message: 'Método de pago borrado con éxito'});
        this.getPaymentMethods();
      }, error => {
        this.alertService.open({type: 'error', message: `Sucedió un error al borrar el método de pago. ${error.error.message}`});
      });
    }
  }

  sendCardForm(value: any): void {
    this.accountService.addPaymentMethod(value.token, value.default, value.address).subscribe(resp => {
      this.modalRef.hideModal();
      this.alertService.open({type: 'success', message: 'Nuevo método de pago agregado'});
      this.getPaymentMethods();
    }, error => {
      this.alertService.open({type: 'error', message: `Sucedió un error al crear el método de pago. ${error.error.message}`});
    });
  }
}
