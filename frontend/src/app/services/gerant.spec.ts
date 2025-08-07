import { TestBed } from '@angular/core/testing';

import { Gerant } from './gerant';

describe('Gerant', () => {
  let service: Gerant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gerant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
