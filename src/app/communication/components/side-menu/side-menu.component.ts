import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() newAll = false;
  @Input() newOffer = false;
  @Input() newQuestion = false;
  @Input() newNotification = false;

  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  radioButton!: any;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.section) {
      this.radioButton = this.activeRoute.snapshot.params.section;
    }
  }

  openNoti(type: any): void {
    this.selected.emit(type.value);
    this.router.navigate([`/communication/${type.value}`]);
  }

}
