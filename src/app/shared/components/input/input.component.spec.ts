import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../../shared.module';
import { TitleComponent } from '../title/title.component';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [],
      declarations: [ InputComponent, SearchSmallComponent, TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
