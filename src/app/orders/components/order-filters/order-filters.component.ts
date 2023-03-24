import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Order } from '../../interfaces/orders';
import { OrdersService } from '../../services/orders.service';
import dateFormat from '../../../shared/utils/date-format-helper';

@Component({
  selector: 'app-order-filters',
  templateUrl: './order-filters.component.html',
  styleUrls: ['./order-filters.component.scss']
})
export class OrderFiltersComponent implements OnInit {

  @Input() selectedTab!: any; // TODO: Define type
  @Input() crumbData!: any; // TODO: Define type
  @Output() sendFilters = new EventEmitter<any>();
  @Output() sendProducts = new EventEmitter<any>();
  @Output() loader = new EventEmitter<boolean>();
  order_products: any;

  in_process!: boolean;
  cancelled!: boolean;

  filters = {
    page: 1,
    created_at_begin: null,
    created_at_end: null,
    product_name: null,
    order_number: null, // uuid
    order_public_id: null,
    status: null,
    page_size: 200
  };

  filterForm = new FormGroup({
    created_at_begin: new FormControl(null),
    created_at_end: new FormControl(null),
    product_name: new FormControl(null),
    order_number: new FormControl(null),
    order_public_id: new FormControl(null),
    status: new FormControl(null),
  });

  get created_at_begin(): FormControl { return this.filterForm.get('created_at_begin') as FormControl; }
  get created_at_end(): FormControl { return this.filterForm.get('created_at_end') as FormControl; }
  get product_name(): FormControl { return this.filterForm.get('product_name') as FormControl; }
  get order_number(): FormControl { return this.filterForm.get('order_number') as FormControl; }
  get order_public_id(): FormControl { return this.filterForm.get('order_public_id') as FormControl; }
  get status(): FormControl { return this.filterForm.get('status') as FormControl; }

  openFilter = false;
  orders$!: Observable<Order[]>;
  status_data: Array<{name: string, id: string}> = [
    {name: 'Pendiente', id: 'pending'},
    {name: 'Pago pendiente', id: 'payment_pending'},
    {name: 'En proceso', id: 'processing'},
    {name: 'Aceptado', id: 'accepted'},
    {name: 'Enviado', id: 'shipped'},
    {name: 'Entregado', id: 'delivered'},
    {name: 'Rechazado', id: 'rejected'},
    {name: 'Expirado', id: 'expired'},
    {name: 'Cancelado', id: 'cancelled'},
    {name: 'Completado', id: 'completed'}
  ];

  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getOrders();

    this.filterForm.valueChanges.pipe(
      debounceTime(250)
    ).subscribe(val => {
      this.filters = {
        ...val,
        page: this.filters.page,
        created_at_begin : dateFormat(this.created_at_begin.value),
        created_at_end : dateFormat(this.created_at_end.value),
        in_process: this.in_process || null,
        cancelled: this.cancelled || null,
      };
      this.getOrders(this.filters);
    });
  }

  toggleFilter(): void {
    this.openFilter = !this.openFilter;
    this.patchFormControl('');
  }

  getStatus(status?: number): void {
    switch (status) {
      case 0: {
        this.status_data = [
          {name: 'Pendiente', id: 'pending'},
          {name: 'En proceso', id: 'processing'},
          {name: 'Pago pendiente', id: 'payment_pending'},
          {name: 'Aceptado', id: 'accepted'},
          {name: 'Enviado', id: 'shipped'},
          {name: 'Entregado', id: 'delivered'},
          {name: 'Rechazado', id: 'rejected'},
          {name: 'Expirado', id: 'expired'},
          {name: 'Cancelado', id: 'cancelled'},
          {name: 'Completado', id: 'completed'}
        ];
        this.cancelled = false;
        this.in_process = false;
        break;
      }
      case 1: {
        this.status_data = [{name: 'En proceso', id: 'processing'}, {name: 'Aceptado', id: 'accepted'}, {name: 'Enviado', id: 'shipped'}];
        this.cancelled = false;
        this.in_process = true;
        break;
      }
      case 2: {
        this.status_data = [{name: 'Rechazado', id: 'rejected'}, {name: 'Cancelado', id: 'cancelled'}];
        this.cancelled = true;
        this.in_process = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  getOrders(filters?: any): void {
    this.loader.emit(true);
    this.orders$ = this.ordersService.getAllOrders(filters).pipe(map(res => {
      this.order_products = res.data.page_data.map(val => val.products);
      this.sendFilters.emit(res.data.page_data);
      this.sendProducts.emit(res.data.page_data.map(val => val.products));
      this.loader.emit(false);
      return res.data.page_data;
    }));
  }

  patchFormControl(e?: any): void {
    this.order_public_id.patchValue(e);
  }
}
