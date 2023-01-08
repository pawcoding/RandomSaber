import { TestBed } from '@angular/core/testing';

import { SongSelectorService } from './song-selector.service';

describe('SongSelectorService', () => {
  let service: SongSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
