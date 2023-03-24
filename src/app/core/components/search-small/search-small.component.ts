import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../../services/core.service';
import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DEFAULT_ROUTE_WRONG_ACCESS } from 'src/app/auth/interfaces/token-response';

@Component({
  selector: 'app-search-small',
  templateUrl: './search-small.component.html',
  styleUrls: ['./search-small.component.scss'],
})
export class SearchSmallComponent implements OnInit, OnDestroy {

  @Input() title = '';
  closeNavbar = 'closed';
  closeFilters = 'closed';
  cart!: number;
  hidden = false;

  user$!: any;
  userName!: string;
  logged = false;
  logged$: any;

  cart$: any;
  showDropDown = false;

  filterForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  get name(): FormControl { return this.filterForm.get('name') as FormControl; }

  constructor(
    private router: Router,
    private coreService: CoreService,
    public catalog: ProductCatalogComponent,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLogged();
    this.showSubMenu();
    this.coreService.getCartNumber();
    this.getCartNumber();
  }

  showSubMenu(): void {
    this.showDropDown = this.authService.isLoggedIn();
    this.logged = this.authService.isLoggedIn();
    if (this.logged) {
      this.getUserName();
    }
  }

  isLogged(): void {
    this.logged$ = this.authService.logged.subscribe(resp => {
      this.showDropDown = resp;
      this.logged = resp;
      return resp;
    });
  }

  getUserName(): void {
    this.user$ = this.authService.user$.subscribe(resp => {
      if (resp?.user_data?.first_name) {
        this.userName = `${resp.user_data?.first_name}`;
      }
    });
  }

  openRoutes(): void {
    this.closeNavbar = 'open';
  }

  // TODO: Vefify that this is being use
  openFilters(): void {
    this.closeFilters = 'open';
  }

  applyFilters(): void {
    if (this.name.valid) {
      window.location.assign(`/product/search?name=${this.name.value}`);
    } else {
      window.location.assign(`/product/search/`);
    }
  }

  getCartNumber(): void {
    this.cart$ = this.coreService.cartAlert$.subscribe(resp => {
      this.cart = resp.qty;
      this.hidden = resp.hidden;
    });
  }

  ngOnDestroy(): void {
    this.cart$.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([DEFAULT_ROUTE_WRONG_ACCESS]);
  }
}
