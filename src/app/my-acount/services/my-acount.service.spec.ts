import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseService } from 'src/app/shared/services/base.service';

import { MyAcountService } from './my-acount.service';

describe('MyAcountService', () => {
  let service: MyAcountService;
  let base: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(MyAcountService);
    base = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get AllAddresses', () => {
    const spy = spyOn(base, 'get');
    service.getAllAddresses();
    expect(spy).toHaveBeenCalled();
  });

  it('should add productd', () => {

    let data = { 
      name:             '',
      street:           '', 
      number:           '', 
      neighborhood:     '',  
      country:          '', 
      state:            '', 
      postal_code:      '',
      references:       '', 
      municipality:     1, 
      delivery_default: false, 
      fiscal_address:   false,
      delivery_address: true, 
    }

    const spy = spyOn(base, 'post');
    service.addAddress(data);
    expect(spy).toHaveBeenCalled();
  });
});
