import { TestBed } from '@angular/core/testing';

import { TraktService } from './trakt.service';

describe('TraktService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraktService = TestBed.get(TraktService);
    expect(service).toBeTruthy();
  });
});
