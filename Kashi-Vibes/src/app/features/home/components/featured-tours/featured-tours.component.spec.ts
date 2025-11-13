import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedToursComponent } from './featured-tours.component';

describe('FeaturedToursComponent', () => {
  let component: FeaturedToursComponent;
  let fixture: ComponentFixture<FeaturedToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedToursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
