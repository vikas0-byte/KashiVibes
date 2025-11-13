import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPackageGridComponent } from './food-package-grid.component';

describe('FoodPackageGridComponent', () => {
  let component: FoodPackageGridComponent;
  let fixture: ComponentFixture<FoodPackageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodPackageGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPackageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
