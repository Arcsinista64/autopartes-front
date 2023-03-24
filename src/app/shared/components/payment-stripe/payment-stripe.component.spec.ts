import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxStripeModule, StripeService } from 'ngx-stripe';

import { PaymentStripeComponent } from './payment-stripe.component';

describe('PaymentStripeComponent', () => {
  let component: PaymentStripeComponent;
  let fixture: ComponentFixture<PaymentStripeComponent>;
  let service: StripeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStripeComponent ],
      imports: [
        HttpClientTestingModule,
        NgxStripeModule,
      ],
      providers: [ StripeService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
