import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatRideComponent } from './boat-ride.component';

describe('BoatRideComponent', () => {
  let component: BoatRideComponent;
  let fixture: ComponentFixture<BoatRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoatRideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
