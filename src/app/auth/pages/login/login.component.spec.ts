import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule, 
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login() on click', fakeAsync(()=> {
    const spy = spyOn(component, 'login');
    const ele = fixture.debugElement.nativeElement.querySelector('.btn');

    ele.click();
    tick();

    expect(spy).toHaveBeenCalled();
  }));


  //Expect error
  it('should mark as touch the loginForm, when calling login()', () => {
    component.login();

    fixture.detectChanges();

    expect(component.loginForm.touched).toBeTrue();
  });

});
