import { TestBed } from '@angular/core/testing';

import { PaginaterService } from './paginater.service';

describe('PaginaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginaterService = TestBed.get(PaginaterService);
    expect(service).toBeTruthy();
  });
});
