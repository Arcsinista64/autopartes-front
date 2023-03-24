import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InputSelectCategories, InputSelectCountry, InputSelectSubcategories } from 'src/app/shared/interfaces/interfaces';
import { FixturesService } from 'src/app/shared/services/fixtures.service';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

interface InputSelect {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {
  crumbData: any = [];

  products$: Observable<Product[]> = new Observable<Product[]>();
  categories$!: Observable<InputSelectCategories[]>;
  subcategories$!: Observable<InputSelectSubcategories[]>;
  countries$!: Observable<InputSelectCountry[]>;

  conditions$!: Observable<any[]>;

  filterPanel = false;

  totalLength!: number;
  pages: number[] = [];
  currentPage = 1;

  filters = {};

  filterForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl([]),
    subcategory: new FormControl([]),
    part_number: new FormControl([]),
    brand: new FormControl([]),
    origin: new FormControl([]),
    condition: new FormControl([]),
    min_price: new FormControl('0'),
    max_price: new FormControl('0'),
    page: new FormControl(1)
  });

  get page(): FormControl { return this.filterForm.get('page') as FormControl; }
  get name(): FormControl { return this.filterForm.get('name') as FormControl; }
  get category(): FormControl { return this.filterForm.get('category') as FormControl; }
  get subcategory(): FormControl { return this.filterForm.get('subcategory') as FormControl; }
  get part_number(): FormControl { return this.filterForm.get('part_number') as FormControl; }
  get brand(): FormControl { return this.filterForm.get('brand') as FormControl; }
  get origin(): FormControl { return this.filterForm.get('origin') as FormControl; }
  get condition(): FormControl { return this.filterForm.get('condition') as FormControl; }
  get minValue(): FormControl { return this.filterForm.get('min_price') as FormControl; }
  get highValue(): FormControl { return this.filterForm.get('max_price') as FormControl; }

  maxValue$!: Observable<number>;
  value = 0;
  topValue = 0;
  ngMinValue!: number;
  ngHighValue!: number;
  options!: Options;

  resultsTitle = '';

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private fixtureService: FixturesService,
  ) { }

  ngOnInit(): void {
    this.whatToGet();
    this.minValue.patchValue(this.ngMinValue);
    this.highValue.patchValue(this.ngHighValue);
    this.getCategories();
    this.getSubCategories();
    this.getCountries();
    this.getConditions();

    // this.filterForm.valueChanges.pipe(
    //   debounceTime(250)
    // ).subscribe(val => {
    //   this.filters = {
    //     ...val,
    //   };
    //   this.getProducts(this.filters);
    // });

    // this.options = {
    //   floor: 0,
    //   ceil: 10000
    // };
    this.getMaxValue();
  }

  getMaxValue(): any { 
    const filters = { ...this.filters, page: 1 };
    this.maxValue$ = this.productService.getProducts(filters).pipe(
      map(res => {
        const max = Math.max(...res.data.page_data.map((item: { price: any; }) => Number(item.price)));
        this.options = {
          floor: 0,
          ceil: max
        };
        this.ngMinValue = 0;
        this.ngHighValue = max;
        this.topValue = max;
        this.minValue.patchValue(this.ngMinValue);
        this.highValue.patchValue(this.ngHighValue);
        return max;
      }
    ));
  }

  minPriceChange(event: any): void {
    this.minValue.setValue(this.value);
  }

  maxPriceChange(event: any): void {
    this.highValue.setValue(this.topValue);
  }
  
  whatToGet(): void {
    const filter = this.route.snapshot.queryParams;
    const keys = Object.keys(filter)[0];
    switch (keys) {
      case 'category': {
        this.crumbData = [
          {txt: 'Búsqueda de productos', url: '/product/search?category=' + filter.category},
        ];
        setTimeout(() => {
          this.category.patchValue([filter.category]);
          this.applyFilters();
        });
        break;
      }
      case 'subcategory': {
        this.crumbData = [
          {txt: 'Categorías', url: '/product/categories'},
          {txt: 'Búsqueda de productos', url: '/product/search?subcategory=' + filter.subcategory},
        ];
        setTimeout(() => {
          this.subcategory.patchValue([filter.subcategory]);
          this.applyFilters();
        });
        break;
      }
      case 'name': {
        this.crumbData = [
          {txt: 'Búsqueda de productos', url: '/product/search?name=' + filter.name},
        ];
        this.name.patchValue([filter.name]);
        this.applyFilters();
        break;
      }
      default: {
        this.crumbData = [
          {txt: 'Búsqueda de productos', url: '/product/search'},
        ];
        this.getProducts();
        break;
      }
    }
  }

  getProducts(filters?: any): void {
    this.products$ = this.productService.getProducts(filters).pipe(map(res => {
      if (res.data.page_data.length > 0) {
        this.resultsTitle = `${res.data.total} resultados...`;
      } else {
        this.resultsTitle = ``;
      }
      this.pagination(Number(res.data.total));
      return res.data.page_data;
    }), catchError(_ => { 
      throw this.alertService.open({type: 'error', message: 'Error al obtener los productos, por favor intente mas tarde'}); 
    }));
  }

  pagination(total: number): void { 
    const aux = Math.ceil(total / 32);
    this.pages = Array(aux).fill(0).map((x, i) => i);
  }

  /**
   * Show or hide the web dimension filter panel. should show when dimensions are 700px + and should be hidden when they are 699px-
   */
  showHideFilterPanel(): void {
    this.filterPanel = !this.filterPanel;
  }

  applyFilters(page?: number): void {
    this.filterPanel = false;
    this.page.setValue(page);
    this.minValue.setValue(this.value);
    this.highValue.setValue(this.topValue);
    this.getProducts(this.filterForm.value);
    page ? this.currentPage = page : this.currentPage = 1;
  }

  /**
   * @param event
   * this event is coming from ngx-paginator when is clicked on another page in paginator,
   * literally change from actual page to selected page and show products in that page
   */
  pageChanged(event: any): void {
    this.page.setValue(event);
  }

  getCategories(): void {
    this.categories$ = this.productService.getAllCategories().pipe(map(res => res.data));
  }

  getSubCategories(): void {
    this.subcategories$ = this.productService.getAllSubCategories().pipe(map(res => res.data));
  }

  getCountries(): void {
    this.countries$ = this.fixtureService.getAllCountries().pipe(map(res => res.data));
  }

  getConditions(): void {
    this.conditions$ = this.productService.getProductConditions().pipe(map(res => res.data));
  }
}
