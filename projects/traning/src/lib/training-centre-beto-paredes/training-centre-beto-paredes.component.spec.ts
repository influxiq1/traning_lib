import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCentreBetoParedesComponent } from './training-centre-beto-paredes.component';

describe('TrainingCentreBetoParedesComponent', () => {
  let component: TrainingCentreBetoParedesComponent;
  let fixture: ComponentFixture<TrainingCentreBetoParedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingCentreBetoParedesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCentreBetoParedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
