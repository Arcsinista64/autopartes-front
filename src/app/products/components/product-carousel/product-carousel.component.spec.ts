import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCarouselComponent } from './product-carousel.component';

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, OverlayModule, SharedModule],
      declarations: [ ProductCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call startTimer', () => {
  //   const spy = spyOn(component, 'startTimer');
  //   component.slides = ['t','e','s','t'];
  //   component.autoPlayDuration = 4;

  //   component.ngOnInit();

  //   fixture.detectChanges();
    
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call restTimer and startTimer on select', () => {
  //   const spyRest = spyOn(component, 'resetTimer');
  //   const spyStart = spyOn(component, 'startTimer');

  //   component.select(1);

  //   fixture.detectChanges();

  //   expect(spyRest).toHaveBeenCalled();
  //   expect(spyStart).toHaveBeenCalled();
  // });

  // it('should return Direction.Next on true', () => {
  //   component.slides = ['t','e','s','t'];
    
  //   expect(component.getDirection(3,0)).toBe(Direction.Next);
  // });

  // it('should return Direction.prec on false', () => {
  //   component.slides = ['t','e','s','t'];
    
  //   expect(component.getDirection(0,3)).toBe(Direction.Prev);
  // });

  // it('should clearInterval of currentInterval when has one and calling resetTimer', 
  //   ()=> {
  //     component.currentInterval = setInterval(
  //       () => 
  //         component.select(component.activeSlides.next),
  //         component.autoPlayDuration
  //     );      
  //     component.resetTimer();

  //     fixture.detectChanges();

  //     expect(clearInterval).toBeTruthy();
  //   }
  // );

  // it('should call restTimer to currentInterval', () => {
  //   const spy = spyOn(component, 'resetTimer');
  //   component.autoPlayDuration = 1;
 
  //   fixture.detectChanges();
  //   component.startTimer();

  //   expect(spy).toHaveBeenCalled();
  //   expect(component.currentInterval).toBeTruthy();

  // });

  // it('should return current', () => {
  //   component.activeSlides.current = 1;
  //   fixture.detectChanges();

  //   expect(component.getAnimationSlideState(1)).toEqual('current');
  // });

});
