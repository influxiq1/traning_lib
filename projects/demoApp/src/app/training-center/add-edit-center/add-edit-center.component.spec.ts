import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCenterComponent } from './add-edit-center.component';

describe('AddEditCenterComponent', () => {
  let component: AddEditCenterComponent;
  let fixture: ComponentFixture<AddEditCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
