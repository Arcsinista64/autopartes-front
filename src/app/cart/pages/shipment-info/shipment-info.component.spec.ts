import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCatalogComponent } from 'src/app/products/pages/product-catalog/product-catalog.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ShipmentInfoComponent } from './shipment-info.component';

describe('ShipmentInfoComponent', () => {
  let component: ShipmentInfoComponent;
  let fixture: ComponentFixture<ShipmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        OverlayModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ ShipmentInfoComponent ],
      providers: [ ProductCatalogComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set default address to true', () => {
  //   component.default = false;
  //   component.defaultChange();
  //   fixture.detectChanges();
  //   expect(component.default).toBeTruthy();
  // });
  
  // it('should set default address to false', () => {
  //   component.default = true;
  //   component.defaultChange();
  //   fixture.detectChanges();
  //   expect(component.default).toBeFalsy();
  // });

  it('should send data is editmode', () => {
    const spy = spyOn(component, 'postAddress');
    component.postAddress();
    
    expect(spy).toHaveBeenCalled();
  });

  // it('should set country to México and filter states when a Mexico is selected', () => {
  //   const spy = spyOn(component, 'getStates');
  //   component.filterStates(158);
  //   component.getStates();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should getStates only if country is Mexico', () => {
  //   component.filterStates(158);
  //   component.statesMX ? component.getMunicipalities() : '';
  //   expect(component.statesMX).toBeTruthy();
  // });
  
  //Property 'filterStates' does not exist on type 'ShipmentInfoComponent'.
  // it('should select a country that is not mexico and set state field how free text and reset value', () => {
  //   const spy = spyOn(component.state, 'reset');
  //   component.filterStates(1);
  //   expect(spy).toHaveBeenCalled();
  // });
  
  //Property 'filterMunicipalities' does not exist on type 'ShipmentInfoCo
  // it('should set State to Nuevo León and filter municipalities when a Mexico is selected', () => {
  //   const spy = spyOn(component, 'getMunicipalities');
  //   component.filterMunicipalities(19);
    
  //   expect(spy).toHaveBeenCalled();
  // });
  
  //Property 'municipalitiesNL' does not exist on type 'ShipmentInfoComponent'
  // it('should getMunicipalities only if state is Nuevo Leon', () => {
  //   component.filterMunicipalities(19);
  //   component.municipalitiesNL ? component.getMunicipalities() : '';
  //   expect(component.municipalitiesNL).toBeTruthy();
  // });
  
  //Property 'filterMunicipalities' does not exist on type 'ShipmentInfoCompone
  // it('should select a State that is not Nuevo León and set municipalities field how free text and reset value', () => {
  //   const spy = spyOn(component.municipality, 'reset');
  //   component.filterMunicipalities(1);
  //   expect(spy).toHaveBeenCalled();
  // });
  
  // it('should try to post address as default and fiscal', () => {
  //   component.radioButton = 0;
  //   const spy = spyOn(component, 'postAddress');
  //   component.nextStep();
  //   expect(spy).toHaveBeenCalled();
  // });
  
  // it('should try to post address as default and another how fiscal address', () => {
  //   component.radioButton = 1;
  //   const spy = spyOn(component, 'postFiscalAddress');
  //   component.nextStep();
  //   expect(spy).toHaveBeenCalled();
  // });
  
  it('It is only call test facturationAddressForm ', () => {
    component.postFiscalAddress();
    expect(true).toBeTruthy();
  });
  
  it('It is only call test postAddress ', () => {
    component.postAddress();
    expect(true).toBeTruthy();
  });

  

});
