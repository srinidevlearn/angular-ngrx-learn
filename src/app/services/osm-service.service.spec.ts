import { TestBed } from '@angular/core/testing';

import { OsmService } from './osm-service.service';

describe('OsmServiceService', () => {
  let service: OsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
