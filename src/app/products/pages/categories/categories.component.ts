import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InputSelectCategories, InputSelectSubcategories } from '../../interfaces/interfaces';
import { ProductsService } from '../../services/products.service';
import { ProductCatalogComponent } from '../product-catalog/product-catalog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  crumbData: any = [
    {txt: 'Categorías', url: '/product/categories'},
  ];

  categories$!: Observable<InputSelectCategories[]>;
  subcategories$!: Observable<InputSelectSubcategories[]>;

  alphabet: any = [];
  arraySelected: any = [];
  selected = 'A';
  selected2: string | null = 'B';
  selected3: string | null = 'C';
  subcategories: any = [];
  subcategories2: any = [];
  subcategories3: any = [];
  selectedCategory: string | null = null;

  constructor(
    private alertService: AlertService,
    private productService: ProductsService,
    public catalog: ProductCatalogComponent,
    private router: Router,
  ) {
    for (let i = 65; i < 91; i++) {
      this.alphabet.push(String.fromCharCode(i));
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSubCategories();
  }

  getCategories(): void {
    this.categories$ = this.productService.getAllCategories().pipe(map(res => {
      return res.data;
    }));
  }

  filterSubcategories(e: any): void {
      e.value?.id ? this.selectedCategory = e.value.id : this.selectedCategory = null;
      this.getSubCategories();
  }

  getSubCategories(): void {
    this.subcategories = [];
    this.subcategories2 = [];
    this.subcategories3 = [];

    this.subcategories$ = this.productService.getAllSubCategories().pipe(map(res => {
      res.data.find(element => {
        if (this.selectedCategory === null) {
          element.name[0] === this.selected ? this.subcategories.push(element) : '';
          element.name[0] === this.selected2 ? this.subcategories2.push(element) : '';
          element.name[0] === this.selected3 ? this.subcategories3.push(element) : '';
        } else {
          (element.category.id === this.selectedCategory && element.name[0] === this.selected) ? this.subcategories.push(element) : '';
          (element.category.id === this.selectedCategory && element.name[0] === this.selected2) ? this.subcategories2.push(element) : '';
          (element.category.id === this.selectedCategory && element.name[0] === this.selected3) ? this.subcategories3.push(element) : '';
        }
      });
      return res.data;
    }), catchError(error => { throw this.alertService.open({type: 'error', message: 'Hubo un error al obtener una subcategoría.'}); }));
  }

  filterByAlphabet(id: number): string {
    this.selected = String.fromCharCode(id);
    if (id < 89) {
      this.selected2 = String.fromCharCode(id + 1);
      this.selected3 = String.fromCharCode(id + 2);
    }
    else {
      if (id === 89) { this.selected2 = String.fromCharCode(id + 1); this.selected3 = null; }
      if (id === 90) { this.selected2 = null; this.selected3 = null; }
    }
    this.getSubCategories();
    return this.selected;
  }

  goTo(subcategory: any): void {
    this.router.navigate([`/product/search`], { queryParams: { subcategory } });
  }
}
