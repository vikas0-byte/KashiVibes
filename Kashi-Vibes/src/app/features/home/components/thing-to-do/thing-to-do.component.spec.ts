import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingToDoComponent } from './thing-to-do.component';

describe('ThingToDoComponent', () => {
  let component: ThingToDoComponent;
  let fixture: ComponentFixture<ThingToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThingToDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThingToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
