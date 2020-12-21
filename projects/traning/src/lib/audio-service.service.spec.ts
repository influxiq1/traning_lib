import { TestBed } from '@angular/core/testing';

import { AudioServiceService } from './audio-service.service';

describe('AudioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioServiceService = TestBed.get(AudioServiceService);
    expect(service).toBeTruthy();
  });
});
