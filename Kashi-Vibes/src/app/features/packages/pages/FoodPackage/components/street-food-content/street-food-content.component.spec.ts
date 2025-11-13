import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetFoodContentComponent } from './street-food-content.component';

describe('StreetFoodContentComponent', () => {
  let component: StreetFoodContentComponent;
  let fixture: ComponentFixture<StreetFoodContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreetFoodContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreetFoodContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
