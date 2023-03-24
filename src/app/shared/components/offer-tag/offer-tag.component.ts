import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-tag',
  templateUrl: './offer-tag.component.html',
  styleUrls: ['./offer-tag.component.scss']
})
export class OfferTagComponent implements OnInit {
  @Input() show = false;

  constructor() { }

  ngOnInit(): void {
  }

}
