import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreEventComponent } from './pre-event.component';

describe('PreEventComponent', () => {
  let component: PreEventComponent;
  let fixture: ComponentFixture<PreEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
