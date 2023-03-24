import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stars-grades',
  templateUrl: './stars-grades.component.html',
  styleUrls: ['./stars-grades.component.scss']
})
export class StarsGradesComponent implements OnInit {
  @Input() rating:number = 0;
  @Input() enabled:boolean = false;
  @Output() rate: EventEmitter<number> = new EventEmitter<number>();

  stars = [
    {
      id: 1,
      active: false,
    },
    {
      id: 2,
      active: false,
    },
    {
      id: 3,
      active: false,
    },
    {
      id: 4,
      active: false,
    },
    {
      id: 5,
      active: false,
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.verifyStar(this.rating);
  }

  restart(rating: number) : void { 
    for(let i = 0; i < 5; i++) { 
      this.stars[i].active = false;
    }
  }

  verifyStar(rating: number): void {
    rating = Number(rating);
    if (rating >= 1) { this.stars[0].active = true; } 
    if (rating >= 2) { this.stars[1].active = true; } 
    if (rating >= 3) { this.stars[2].active = true; } 
    if (rating >= 4) { this.stars[3].active = true; }
    if (rating >= 5) { this.stars[4].active = true; }
  }

  changeValue(index: number) { 
    this.restart(index);
    this.verifyStar(index);
    this.rate.emit(index);
  }

  mouseHover(index: number) {
    if (index >= 1) { this.stars[0].active = true; } 
    if (index >= 2) { this.stars[1].active = true; } 
    if (index >= 3) { this.stars[2].active = true; } 
    if (index >= 4) { this.stars[3].active = true; }
    if (index >= 5) { this.stars[4].active = true; }
    this.changeValue(index);
  }
}