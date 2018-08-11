import { TestBed, inject } from '@angular/core/testing';

import { CanteenSeverApiService } from './canteen-sever-api.service';

describe('CanteenSeverApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanteenSeverApiService]
    });
  });

  it('should be created', inject([CanteenSeverApiService], (service: CanteenSeverApiService) => {
    expect(service).toBeTruthy();
  }));
});
