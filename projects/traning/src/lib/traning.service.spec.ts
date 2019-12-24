import { TestBed } from '@angular/core/testing';

import { TraningService } from './traning.service';

describe('TraningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraningService = TestBed.get(TraningService);
    expect(service).toBeTruthy();
  });
});
