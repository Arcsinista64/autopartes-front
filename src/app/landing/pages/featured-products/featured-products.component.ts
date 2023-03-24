import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesService } from 'src/app/shared/services/fixtures.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  crumbData: any = [];
  featured$!: Observable<any>;
  constructor(
    private fixtureService: FixturesService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.crumbData = [
      {txt: 'Productos descatacados ', url: '/featured'}, 
    ];
  }

  getProducts(): void {
    this.featured$ = this.fixtureService.getAllLandingInfo().pipe(map(res => res.data[0].featured_products));
  }
}
