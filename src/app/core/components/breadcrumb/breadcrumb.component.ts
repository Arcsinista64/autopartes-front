import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() array!: any;
  @Input() socialMedia = true;
  @Input() notifications = false;

  icons = [
    {
      name: 'Instagram',
      src: 'assets/social-media/ig.svg',
      url: 'https://www.instagram.com/AutoPartesnet'
    },
    {
      name: 'Facebook',
      src: 'assets/social-media/fb.svg',
      url: 'https://www.facebook.com/AutoPartesNt'
    },
    {
      name: 'Twitter',
      src: 'assets/social-media/tw.svg',
      url: 'https://twitter.com/AutoPartes_Net'
    },
    {
      name: 'TikTok',
      src: 'assets/social-media/tk.svg',
      url: 'https://www.tiktok.com/@autopartes_net?'
    },
  ]

  mobile = false;

  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth <= 900) {
      this.mobile = true;
    }
  }

  sendEvent(url: any): void {
   window.location.assign(url);
  }

  openWindow(url: string, name: string): void { 
    window.open(url, name, 'width=1000,height=600');
  }

  goBack(): void {
    window.history.back();
  }
}
