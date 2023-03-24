import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesService } from 'src/app/shared/services/fixtures.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers$!: Observable<any>;
  crumbData: any = [];

  constructor(
    private fixtureService: FixturesService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.crumbData = [
      {txt: 'Ofertas', url: '/offers'}, 
    ];
  }

  getProducts(): void {
    this.offers$ = this.fixtureService.getAllLandingInfo().pipe(map(res => res.data[0].offer_products));
  }

}
