import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { RoutesList } from '../../interfaces/routes-list';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FixturesService } from 'src/app/shared/services/fixtures.service';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-small',
  templateUrl: './navbar-small.component.html',
  styleUrls: ['./navbar-small.component.scss'],
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
export class NavbarSmallComponent implements OnInit {
  routes1: RoutesList[] = [];
  routes2: RoutesList[] = [];
  routes3: RoutesList[] = [];
  categories$!: Observable<any>;

  @Input() state = 'closed';
  @Output() closed: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fixtureService: FixturesService,
    public catalog: ProductCatalogComponent,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routes1.push(
      {
        name: 'Inicio',
        route: ''
      },
      {
        name: 'Categorias',
        route: '/product/categories'
      },
      {
        name: 'Productos',
        route: '/product/search/'
      },
      {
        name: 'Ofertas',
        route: '/offers'
      },
    );
    this.getCategories();
  }

  getCategories(): any { 
    this.fixtureService.getAllLandingInfo().subscribe(res => {
      for (const item of res.data[0].categories) {
        this.routes2.push(item);
      }
      this.routes3.push(
        {
          name: 'Decodifica tu serie',
          route: '/decode'
        },
        {
          name: 'Vender',
          route: 'sell'
        },
        {
          name: 'Ayuda',
          route: '/help'
        }
      );
    });
  }

  changeState(): void {
    this.state = 'closed';
    this.closed.emit('closed');
  }

  goTo(category: string): void {
    if (this.catalog.category) {
      window.location.assign(`/product/search?category=${category}`);
    } else {
      this.router.navigate([`/product/search/`], { queryParams: { category } });
    }
  }

  gotToRoutes3(url: string): void {
    if (url === 'sell') {
      window.location.href = environment.sellerFront;
    } else {
      this.router.navigate([url]);
    }
  }

}
