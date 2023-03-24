import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Observable } from 'rxjs';
import { InputSelectCategories, InputSelectCountry, InputSelectSubcategories } from 'src/app/shared/interfaces/interfaces';
import { Options } from '@angular-slider/ngx-slider';
import { FixturesService } from 'src/app/shared/services/fixtures.service';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  animations: [
    trigger('show', [
      state('closed', style({
        display: 'none',
        width: 0,
        height: 0,
      })),
      state('open', style({
        width: '100%',
        height: '100%',
      })),
      transition('closed <=> open', animate('.2s')),
  ]),
    trigger('widthGrow', [
      state('closed', style({
        width: 0,
        height: 0,
        display: 'none'
      })),
      state('open', style({
        width: '100%',
        height: '100%',
      })),
      transition('closed <=> open', animate('.1s')),
    ])
]})
export class FiltersComponent implements OnInit {
  @Input() state = 'closed';
  @Output() closed: EventEmitter<string> = new EventEmitter<string>();

  categories$!: Observable<InputSelectCategories[]>;
  subcategories$!: Observable<InputSelectSubcategories[]>;
  countries$!: Observable<InputSelectCountry[]>;

  value = 0;
  topValue = 0;

  ngMinValue = 0;
  ngHighValue = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000
  };

  brands = [
    { value: '0', viewValue: 'Marca 1' },
    { value: '1', viewValue: 'Marca 2' },
    { value: '2', viewValue: 'Marca 3' }
  ];

  conditions = [
    { value: '0', viewValue: 'Original nuevo' },
    { value: '1', viewValue: 'Original usado' },
    { value: '2', viewValue: 'Aftermarket nuevo' },
    { value: '3', viewValue: 'Aftermarket usado' },
    { value: '4', viewValue: 'Remanufacturado' },
    { value: '5', viewValue: 'Por partes, no funciona' },
  ];

  filterForm = new FormGroup({
    name: new FormControl([]),
    category: new FormControl([]),
    subcategory: new FormControl([]),
    part_number: new FormControl([]),
    brand: new FormControl([]),
    country: new FormControl([]),
    condition: new FormControl([]),
    minValue: new FormControl('0'),
    highValue: new FormControl('1000'),
  });

  get name(): FormControl { return this.filterForm.get('name') as FormControl; }
  get category(): FormControl { return this.filterForm.get('category') as FormControl; }
  get subcategory(): FormControl { return this.filterForm.get('subcategory') as FormControl; }
  get part_number(): FormControl { return this.filterForm.get('part_number') as FormControl; }
  get brand(): FormControl { return this.filterForm.get('brand') as FormControl; }
  get country(): FormControl { return this.filterForm.get('country') as FormControl; }
  get condition(): FormControl { return this.filterForm.get('condition') as FormControl; }
  get minValue(): FormControl { return this.filterForm.get('minValue') as FormControl; }
  get highValue(): FormControl { return this.filterForm.get('highValue') as FormControl; }

  constructor(
    private fixtureService: FixturesService,
    public catalog: ProductCatalogComponent,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSubCategories();
    this.getCountries();
  }

  changeState(): void {
    this.state = 'closed';
    this.closed.emit('closed');
  }

  getCategories(): void {
    this.categories$ = this.fixtureService.getAllCategories().pipe(map(res => res.data));
  }

  getSubCategories(): void {
    this.subcategories$ = this.fixtureService.getAllSubCategories().pipe(map(res => res.data));
  }

  getCountries(): void {
    this.countries$ = this.fixtureService.getAllCountries().pipe(map(res => res.data));
  }

  applyFilters(): void {
    this.changeState();
  }
}
