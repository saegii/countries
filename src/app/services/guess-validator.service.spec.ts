import { TestBed } from '@angular/core/testing';

import { GuessValidatorService } from './guess-validator.service';

describe('GuessValidatorService', () => {
  let service: GuessValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
