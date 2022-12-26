import { TestBed } from '@angular/core/testing';

import { PackLoaderService } from './pack-loader.service';

describe('PackLoaderService', () => {
  let service: PackLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
