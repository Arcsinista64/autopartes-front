import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesService } from 'src/app/shared/services/fixtures.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news$!: Observable<any>; //Todo define inteface
  crumbData: any = [];

  constructor(
    private fixtureService: FixturesService,

  ) { }

  ngOnInit(): void {
    this.getBlogNews();
    this.crumbData = [
      {txt: 'Blog', url: '/blog'}, 
    ];
  }

  getBlogNews() {
    this.news$ = this.fixtureService.getAllNews().pipe(map(res => res.data));
  }
}
