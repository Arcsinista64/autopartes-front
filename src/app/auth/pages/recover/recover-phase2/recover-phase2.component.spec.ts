import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverPhase2Component } from './recover-phase2.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { TitleComponent } from 'src/app/shared/components/title/title.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('RecoverPhase2Component', () => {
  let component: RecoverPhase2Component;
  let fixture: ComponentFixture<RecoverPhase2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, OverlayModule, SharedModule, ReactiveFormsModule],
      declarations: [ RecoverPhase2Component, SearchSmallComponent, TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPhase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
