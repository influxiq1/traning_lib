import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCenterDnaComponent } from './training-center-dna.component';

describe('TrainingCenterDnaComponent', () => {
  let component: TrainingCenterDnaComponent;
  let fixture: ComponentFixture<TrainingCenterDnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingCenterDnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCenterDnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
