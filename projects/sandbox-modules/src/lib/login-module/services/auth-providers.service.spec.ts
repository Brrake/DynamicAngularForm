import { TestBed } from '@angular/core/testing';

import { AuthProvidersService } from './auth-providers.service';

describe('AuthProvidersService', () => {
  let service: AuthProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
