import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../../shared.module';

import { MultiselectComponent } from './multiselect.component';

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ MultiselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('should delete item from array', () => {
  //   component.dataValue = [
  //     { value: '0', viewValue: 'Short' },
  //     { value: '0', viewValue: 'Short' }
  //   ];
  //   expect(component.delete(0)).toEqual(1);
  // });
  
  // it('should delete item from array', () => {
  //   component.dataValue = [
  //     { value: '0', viewValue: 'Short' },
  //     { value: '0', viewValue: 'Short' }
  //   ];
  // });

  
});
