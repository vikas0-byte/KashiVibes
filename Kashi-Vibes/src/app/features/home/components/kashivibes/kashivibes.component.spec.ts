import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KashivibesComponent } from './kashivibes.component';

describe('KashivibesComponent', () => {
  let component: KashivibesComponent;
  let fixture: ComponentFixture<KashivibesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KashivibesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KashivibesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
