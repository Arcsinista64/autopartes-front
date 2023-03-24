import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() hasClose = true;
  @Input() title!: string;
  @Input() active!: boolean;
  @Input() header: boolean = true;
  @Input() dialogConfig: MatDialogConfig<any> = {
    maxWidth: '100vw',
    maxHeight: '100vh',
    width: '50%',
  };

  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  matDialogRef!: MatDialogRef<any>;
  isMobile: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  @ViewChild('modalContainer') templateRef!: TemplateRef<any>;

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.opened.emit();
    this.matDialogRef = this.dialog.open(this.templateRef, this.dialogConfig);
    const smallDialogSubscription = this.isMobile.subscribe(size => {
      if (size.matches) {
        this.matDialogRef.updateSize('90%', '90%');
      } else {
        this.matDialogRef.updateSize(this.dialogConfig.width || '50%', this.dialogConfig.height || '50%');
      }
    });

    this.matDialogRef.afterClosed().subscribe(result => {
      smallDialogSubscription.unsubscribe();
    });
  }

  hideModal(): void {
    this.closed.emit();
    this.active = false;
    this.matDialogRef.close();
  }
}
