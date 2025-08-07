import { TestBed } from '@angular/core/testing';

import { Disponibilite } from './disponibilite';

describe('Disponibilite', () => {
  let service: Disponibilite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Disponibilite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
