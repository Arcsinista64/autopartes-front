import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSmallComponent } from 'src/app/core/components/search-small/search-small.component';
import { TitleComponent } from 'src/app/shared/components/title/title.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductQuestionComponent } from './product-question.component';

describe('ProductQuestionComponent', () => {
  let component: ProductQuestionComponent;
  let fixture: ComponentFixture<ProductQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule],
      declarations: [ ProductQuestionComponent, SearchSmallComponent, TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
