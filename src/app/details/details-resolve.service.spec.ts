import { TestBed } from '@angular/core/testing';

import { DetailsResolveService } from './details-resolve.service';

describe('DetailsResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsResolveService = TestBed.get(DetailsResolveService);
    expect(service).toBeTruthy();
  });
});
