import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagefilterComponent } from './packagefilter.component';

describe('PackagefilterComponent', () => {
  let component: PackagefilterComponent;
  let fixture: ComponentFixture<PackagefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagefilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
