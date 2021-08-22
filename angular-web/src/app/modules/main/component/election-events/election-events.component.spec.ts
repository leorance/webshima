import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionEventsComponent } from './election-events.component';

describe('ElectionEventsComponent', () => {
  let component: ElectionEventsComponent;
  let fixture: ComponentFixture<ElectionEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
