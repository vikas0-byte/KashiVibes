import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstreetComponent } from './foodstreet.component';

describe('FoodstreetComponent', () => {
  let component: FoodstreetComponent;
  let fixture: ComponentFixture<FoodstreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstreetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodstreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
