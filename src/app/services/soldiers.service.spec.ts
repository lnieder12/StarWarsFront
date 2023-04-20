import { TestBed } from '@angular/core/testing';

import { SoldiersService } from './soldiers.service';

describe('SoldiersService', () => {
  let service: SoldiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
