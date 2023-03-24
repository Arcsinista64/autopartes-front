import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { DynamicDataSource, DynamicTableComponent } from './dynamic-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent<any>;
  let component2: DynamicDataSource<any>;
  let fixture: ComponentFixture<DynamicTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatTableModule, 
        CdkTableModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [DynamicTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should spy ngAfterContentInit', () => {
  //   const spy = spyOn(component, 'ngAfterContentInit');
  //   component.ngAfterContentInit();
  //   expect(spy).toHaveBeenCalledWith();
  // });

  // it("should return data to display on table", () => {
  //   component.data = of(
  //     [
  //       { img: 'Imágen', description: 'Manija de Puerta Delantera Izquierda Tahoe 09 2010 2011 2012', qty: '1', price: '$900' },
  //       { img: 'Imágen', description: 'Manija de Puerta Delantera Izquierda Tahoe 09 2010 2011 2012', qty: '1', price: '$900' },
  //       { img: 'Imágen', description: 'Manija de Puerta Delantera Izquierda Tahoe 09 2010 2011 2012', qty: '1', price: '$900' }
  //     ]
  //   );
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.res.length).toBeGreaterThan(0);
  // });

  // it('should spy connect', () => {
  //   const spy = spyOn(component2, 'connect');
  //   component2.connect();
  //   expect(spy).toHaveBeenCalledWith();
  // });

  //  it('should call initializer function in constructor', () => {
  //   TestBed.createComponent(DynamicTableComponent); // this is the trigger of constructor method
  //  expect(sideNavService.initialize).toHaveBeenCalled(); // sample jasmine spy based test case
  // });
});
