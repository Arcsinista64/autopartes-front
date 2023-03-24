import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wording',
  templateUrl: './wording.component.html',
  styleUrls: ['./wording.component.scss']
})
export class WordingComponent implements OnInit {
  @Input() remainingTime!: any;
  @Input() chatType!: number;
  @Input() data!: any;
  @Input() seller!: boolean;


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  goTo(id: string): void {
    this.router.navigate([`product/detail/` + id]);
  }
}
