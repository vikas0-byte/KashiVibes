import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustompackagesgeneratorComponent } from './custompackagesgenerator.component';

describe('CustompackagesgeneratorComponent', () => {
  let component: CustompackagesgeneratorComponent;
  let fixture: ComponentFixture<CustompackagesgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustompackagesgeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustompackagesgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
