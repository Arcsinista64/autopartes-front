import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordingComponent } from './wording.component';

describe('WordingComponent', () => {
  let component: WordingComponent;
  let fixture: ComponentFixture<WordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
