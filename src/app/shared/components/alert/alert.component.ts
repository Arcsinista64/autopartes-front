import { Component, Inject, OnInit } from '@angular/core';
import { AlertData, ALERT_DATA } from '../../services/alert-service.tokens';
import { AlertOverlayRef } from './alert-overlay-ref';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  typeProps = new Map<string, { cross: string, icon: string, color: string, background: string }>([
    ['error', { cross: 'assets/alert-icons/red-cross.png', icon: 'assets/alert-icons/alert-icon.png', color: '#F13E1E', background: '#FADBD8' }],
    ['warning', { cross: 'assets/alert-icons/yellow-cross.png', icon: 'assets/alert-icons/warning-icon.png', color: '#D1A000', background: '#FDEBD0' }],
    ['success', { cross: 'assets/alert-icons/green-cross.png', icon: 'assets/alert-icons/success-icon.png', color: '#00A05D', background: '#D5F5E3' }],
  ]);
  // Gets the appropriate color depending on the alert type
  get cross(): string  | undefined { return this.typeProps.get(this.data.type)?.cross; }
  get icon(): string | undefined { return this.typeProps.get(this.data.type)?.icon; }
  get borderColor(): string  | undefined { return this.typeProps.get(this.data.type)?.color; }
  get background(): string | undefined { return this.typeProps.get(this.data.type)?.background; }
  get color(): string  | undefined { return this.typeProps.get(this.data.type)?.color; }

  constructor(
    public alertRef: AlertOverlayRef,
    @Inject(ALERT_DATA) public data: AlertData
  ) { }

  ngOnInit(): void {
    // Close the overlay after 5 seconds
    setTimeout(() => this.alertRef.close(), this.data.timeout || 5000);
  }

  /**
   * Closes the alert
   */
  close(): void { this.alertRef.close(); }
}
