import { TestBed } from '@angular/core/testing';

import { AccordionContextService } from './accordion-context.service';

describe('AccordionContextService', () => {
  let service: AccordionContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccordionContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
