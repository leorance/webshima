import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionCountComponent } from './election-count.component';

describe('ElectionCountComponent', () => {
  let component: ElectionCountComponent;
  let fixture: ComponentFixture<ElectionCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
