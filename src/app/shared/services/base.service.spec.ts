import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  // it('should be call the GET service', () => {
  //   expect(service.get('')).toHaveBeenCalled();
  // });
  
  // it('should be call the PUT service', () => {
  //   expect(service.put('', {})).toHaveBeenCalled();
  // });
  
  // it('should be call the POST service', () => {
  //   expect(service.post('', {})).toHaveBeenCalled();
  // });
  
  // it('should be call the DELETE service', () => {
  //   expect(service.delete('')).toHaveBeenCalled();
  // });
  
  // it('should be call the DELETE service with headers', () => {
  //   expect(service.deleteWithBody('', {})).toHaveBeenCalled();
  // });
});
