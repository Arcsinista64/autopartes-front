import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() principalText!: any;
  @Input() secondaryText!: any;
  @Input() senderName!: string;
  @Input() time!: any;
  @Input() id!: any;
  @Input() seen = false;
  @Output() chatSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() notificationSelected: EventEmitter<string> = new EventEmitter<string>();

  initial!: string;
  color!: string;
  constructor() { }

  ngOnInit(): void {
    this.initial = this.senderName[0];
    this.color = this.id[0];
    this.setName();
  }

  openChat(): void {
    this.chatSelected.emit(this.id);
    this.notificationSelected.emit(this.principalText);
  }

  setName(): void {
    this.secondaryText = this.secondaryText.replace('product_name -', ' ');
  }
}
