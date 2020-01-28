import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLessionsComponent } from './add-edit-lessions.component';

describe('AddEditLessionsComponent', () => {
  let component: AddEditLessionsComponent;
  let fixture: ComponentFixture<AddEditLessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditLessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
