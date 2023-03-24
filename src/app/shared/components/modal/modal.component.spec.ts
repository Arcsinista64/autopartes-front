import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from './modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MaterialModule } from 'src/app/material/material.module';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      declarations: [ ModalComponent, ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit opened when calling openModal()', () => {
    const spy = spyOn(component.opened, 'emit');
    component.openModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should set active false when calling hideModal()', () => {
    component.openModal();
    component.hideModal();
    fixture.detectChanges();
    expect(component.active === true).toBeFalse();
  });
  
  // it('should simulate update sizes for mobile dimentions', () => {
  //   const spy = spyOn(component, 'hideModal');
  //   component.isMobile = breakpointObserver.observe("(min-width: 0px) and (max-width: 2400px)");
  //   component.openModal();
  //   component.hideModal();
  //   fixture.detectChanges();
  //   expect(component.active === true).toBeFalse();
  // });
  
});
