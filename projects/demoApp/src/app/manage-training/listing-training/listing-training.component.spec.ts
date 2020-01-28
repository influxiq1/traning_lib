import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTrainingComponent } from './listing-training.component';

describe('ListingTrainingComponent', () => {
  let component: ListingTrainingComponent;
  let fixture: ComponentFixture<ListingTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
