import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhychoosesacredjourneyComponent } from './whychoosesacredjourney.component';

describe('WhychoosesacredjourneyComponent', () => {
  let component: WhychoosesacredjourneyComponent;
  let fixture: ComponentFixture<WhychoosesacredjourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhychoosesacredjourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhychoosesacredjourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
