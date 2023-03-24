import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { FixturesService } from 'src/app/shared/services/fixtures.service';
import { RoutesList } from '../../interfaces/routes-list';
import { CoreService } from '../../services/core.service';
import { DEFAULT_ROUTE_WRONG_ACCESS, DEFAUTL_ROUTE_WRONG } from 'src/app/auth/interfaces/token-response';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showDropDown = false;
  close = 'closed';

  // default = DEFAULT_ROUT_SUCCESS;
  routes1: RoutesList[] = [];
  routes2: RoutesList[] = [];
  routes3: RoutesList[] = [];
  categories$!: Observable<any>;
  user$!: any;

  userName = '';
  logged = false;

  cart$: any;
  cart!: number;
  notifications$: any;
  notifications!: number;
  logged$: any;

  filterForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  get name(): FormControl { return this.filterForm.get('name') as FormControl; }

  constructor(
    private router: Router,
    private coreService: CoreService,
    private fixtureService: FixturesService,
    public catalog: ProductCatalogComponent,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLogged();
    this.getUserName();
    this.showSubMenu();
    this.getCartNumber();
    this.getNotificationsNumber();
    this.coreService.getCartNumber();
    this.coreService.getNotificationsNumber();
    this.routes1.push(
      {
        name: 'Inicio',
        route: ''
      },
      {
        name: 'Categorias',
        route: 'product/categories'
      },
    );
    this.getCategories();
  }

  getCategories(): any {
    return this.categories$ = this.fixtureService.getAllLandingInfo().pipe(map(res => {
      for (const item of res.data[0].categories) {
        this.routes2.push(item);
      }
      this.routes3.push(
        {
          name: 'Vender',
          route: 'sell'
        },
        {
          name: 'Ayuda',
          route: ''
        }
      );
      return res.data[0].categories;
    }));
  }

  open(): void {
    this.close = 'open';
  }

  showSubMenu(): void {
    this.showDropDown = this.authService.isLoggedIn();
    this.logged = this.authService.isLoggedIn();
    if (this.logged)  {
      this.getUser();
    }
  }

  routeToLogIn(): void {
    // if (!this.authService.isLoggedIn()) {
    this.router.navigate([DEFAUTL_ROUTE_WRONG]);
    // }
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
      this.cart = Number(resp.qty);
      // this.hidden = resp.hidden;
    });
  }

  routingTOSeller(url: string): void {
    if (url === 'sell') {
      window.location.href = environment.sellerFront;
    } else {
      this.router.navigate([url]);
    }
  }

  getNotificationsNumber(): void {
    this.notifications$ = this.coreService.notificationsAlert$.subscribe(resp => {
      this.notifications = Number(resp.qty);
      // this.hidden = resp.hidden;
    });
  }

  isLogged(): void {
    this.logged$ = this.authService.logged.subscribe(resp => {
      this.showSubMenu();
      return resp;
    });
  }

  getUser(): void {
    this.authService.getUser().subscribe();
  }

  getUserName(): void{
    this.user$ = this.authService.user$.subscribe(resp => {
      if (resp?.user_data?.first_name) {
        this.userName = `${resp.user_data?.first_name}`;
      }
    });
  }

  goTo(category: string): void {

    if (this.catalog.category) {
      window.location.assign(`/product/search/?category=${category}`);
    } else {
      window.location.assign(`/product/search/`);
    }
  }

  logout(): void {
    this.authService.logout();
    this.coreService.getCartNumber();
    this.coreService.getNotificationsNumber();
    this.router.navigate([DEFAULT_ROUTE_WRONG_ACCESS]);
  }

  ngOnDestroy(): void {
    this.cart$.unsubscribe();
    this.logged$.unsubscribe();
    this.notifications$.unsubscribe();
    this.user$.unsubscribe();
  }
}

