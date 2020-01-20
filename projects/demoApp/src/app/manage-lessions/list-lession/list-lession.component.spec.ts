import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLessionComponent } from './list-lession.component';

describe('ListLessionComponent', () => {
  let component: ListLessionComponent;
  let fixture: ComponentFixture<ListLessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
