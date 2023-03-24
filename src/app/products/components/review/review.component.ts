import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() name: string = '';
  @Input() grade: number | null = null;
  @Input() seller: string | null = null;
  @Input() description: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
