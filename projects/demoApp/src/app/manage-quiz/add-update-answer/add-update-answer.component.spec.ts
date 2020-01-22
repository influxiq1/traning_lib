import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAnswerComponent } from './add-update-answer.component';

describe('AddUpdateAnswerComponent', () => {
  let component: AddUpdateAnswerComponent;
  let fixture: ComponentFixture<AddUpdateAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
