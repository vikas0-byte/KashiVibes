import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetSectionComponent } from './fleet-section.component';

describe('FleetSectionComponent', () => {
  let component: FleetSectionComponent;
  let fixture: ComponentFixture<FleetSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
