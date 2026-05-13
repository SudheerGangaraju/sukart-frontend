import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartStateService } from './cart-state.service';

describe('CartStateService', () => {
  let service: CartStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
