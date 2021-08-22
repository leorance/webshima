import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheWinnerComponent } from './the-winner.component';

describe('TheWinnerComponent', () => {
  let component: TheWinnerComponent;
  let fixture: ComponentFixture<TheWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
