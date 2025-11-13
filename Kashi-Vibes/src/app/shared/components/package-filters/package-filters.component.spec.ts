import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFiltersComponent } from './package-filters.component';

describe('PackageFiltersComponent', () => {
  let component: PackageFiltersComponent;
  let fixture: ComponentFixture<PackageFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
