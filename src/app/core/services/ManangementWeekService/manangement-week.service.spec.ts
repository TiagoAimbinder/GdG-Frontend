import { TestBed } from '@angular/core/testing';

import { ManangementWeekService } from './manangement-week.service';

describe('ManangementWeekService', () => {
  let service: ManangementWeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManangementWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
