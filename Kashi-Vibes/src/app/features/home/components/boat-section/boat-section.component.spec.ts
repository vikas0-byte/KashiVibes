import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatSectionComponent } from './boat-section.component';

describe('BoatSectionComponent', () => {
  let component: BoatSectionComponent;
  let fixture: ComponentFixture<BoatSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoatSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
