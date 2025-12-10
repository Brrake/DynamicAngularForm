import { TestBed } from '@angular/core/testing';

import { SiteTeamService } from './site-team.service';

describe('SiteTeamService', () => {
  let service: SiteTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
