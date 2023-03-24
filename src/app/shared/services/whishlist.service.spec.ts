import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WhishlistService } from './whishlist.service';

describe('WhishlistService', () => {
  let service: WhishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WhishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
