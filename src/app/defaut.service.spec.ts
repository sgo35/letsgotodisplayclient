import { TestBed } from '@angular/core/testing';

import { DefautService } from './defaut.service';

describe('DefautService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefautService = TestBed.get(DefautService);
    expect(service).toBeTruthy();
  });
});
