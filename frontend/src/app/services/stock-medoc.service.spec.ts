import { TestBed } from '@angular/core/testing';

import { StockMedocService } from './stock-medoc.service';

describe('StockMedocService', () => {
  let service: StockMedocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockMedocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
