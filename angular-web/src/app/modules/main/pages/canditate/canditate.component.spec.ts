import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanditateComponent } from './canditate.component';

describe('CanditateComponent', () => {
  let component: CanditateComponent;
  let fixture: ComponentFixture<CanditateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanditateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanditateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
