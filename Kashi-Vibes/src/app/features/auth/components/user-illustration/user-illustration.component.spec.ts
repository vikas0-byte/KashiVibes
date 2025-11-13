import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIllustrationComponent } from './user-illustration.component';

describe('UserIllustrationComponent', () => {
  let component: UserIllustrationComponent;
  let fixture: ComponentFixture<UserIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIllustrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
