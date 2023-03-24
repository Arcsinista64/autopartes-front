import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';

import { WhishlistComponent } from './whishlist.component';

describe('WhishlistComponent', () => {
  let component: WhishlistComponent;
  let fixture: ComponentFixture<WhishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        WhishlistComponent, 
      ],
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTableModule,
        MaterialModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should addToWhishList on click ', () => {
    const spy = spyOn(component, 'addToWhishList');
    const ele = fixture.debugElement.query(By.css('#testing'));
    ele.triggerEventHandler('click', null);
    fixture.detectChanges();
    
    expect(spy).toHaveBeenCalled();
  });

  it('should emit when calling addToWhishList', () => {
    const testData = {idProduct: '1', active: true};
    const spy = spyOn(component.data, 'emit');
    component.idProduct = '1';
    component.active = true;
    component.addToWhishList();

    expect(spy).toHaveBeenCalledWith(testData);
  });
});
