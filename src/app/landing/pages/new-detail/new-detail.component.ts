import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FixturesService } from 'src/app/shared/services/fixtures.service';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.component.html',
  styleUrls: ['./new-detail.component.scss']
})
export class NewDetailComponent implements OnInit {

  new$!: Observable<any>; // Todo Interface
  new_id!: string;
  crumbData: any = [];

  constructor(
    private fixtureService: FixturesService,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.new_id = this.activeRoute.snapshot.params.id;
      this.getNew(this.new_id);
    }
  }

  getNew(id: string) { 
    this.new$ = this.fixtureService.getNewDetail(id).pipe(map(res => {
      this.crumbData = [
        {txt: 'Blog', url: '/blog'}, 
        {txt: res.data.title, url: '/featured/'+res.data.id}, 
      ];
      return res.data;
    }));
  }
}
