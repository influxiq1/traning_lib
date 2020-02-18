import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfortrainingComponent } from './loginfortraining.component';

describe('LoginfortrainingComponent', () => {
  let component: LoginfortrainingComponent;
  let fixture: ComponentFixture<LoginfortrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginfortrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfortrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
