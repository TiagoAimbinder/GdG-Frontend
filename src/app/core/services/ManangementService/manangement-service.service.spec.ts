import { TestBed } from '@angular/core/testing';

import { ManangementServiceService } from './manangement-service.service';

describe('ManangementServiceService', () => {
  let service: ManangementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManangementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
