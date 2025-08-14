import { TestBed } from '@angular/core/testing';

import { Nuevo } from './nuevo';

describe('Nuevo', () => {
  let service: Nuevo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nuevo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
