import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanMaterialComponent } from './lesson-plan-material.component';

describe('LessonPlanMaterialComponent', () => {
  let component: LessonPlanMaterialComponent;
  let fixture: ComponentFixture<LessonPlanMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonPlanMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPlanMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
