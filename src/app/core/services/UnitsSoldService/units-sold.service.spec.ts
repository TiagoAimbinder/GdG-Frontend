import { TestBed } from '@angular/core/testing';

import { UnitsSoldService } from './units-sold.service';

describe('UnitsSoldService', () => {
  let service: UnitsSoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsSoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
