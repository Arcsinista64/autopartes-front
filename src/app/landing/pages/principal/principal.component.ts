import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { customOptions } from 'src/app/shared/interfaces/carousel';
import { FixturesService } from 'src/app/shared/services/fixtures.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  customOptions = customOptions;

  landing$!: Observable<any>; // TODO: define inteface
  news$!: Observable<any>; // TODO: define inteface

  banner!: any;
  featuredCard!: any;

  constructor(
    private fixtureService: FixturesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getLandingInfo();
    this.getBlogNews();
  }

  getLandingInfo(): void {
    this.landing$ = this.fixtureService.getAllLandingInfo().pipe(map(res => {
      this.banner = res.data[0].banners.filter((banner: any) =>  banner.landing_position === 'main');
      this.featuredCard = res.data[0].banners.filter((featuredCard: any) =>  featuredCard.landing_position === 'featured');
      return res.data[0];
    }));
  }

  getBlogNews(): void {
    this.news$ = this.fixtureService.getAllNews().pipe(map(res => res.data));
  }

  goTo(route: any, id?: string): void {
    if (id) {
      this.router.navigate([`/product/search/`], { queryParams: { category: id } });
    } else {
      window.location.href = route;
    }
  }

}
