import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlessonComponent } from './list-lesson.component';

describe('ListLessionComponent', () => {
  let component: ListlessonComponent;
  let fixture: ComponentFixture<ListlessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListlessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListlessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
