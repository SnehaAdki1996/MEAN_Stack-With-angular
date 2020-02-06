import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviagtionBarComponent } from './naviagtion-bar.component';

describe('NaviagtionBarComponent', () => {
  let component: NaviagtionBarComponent;
  let fixture: ComponentFixture<NaviagtionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaviagtionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviagtionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
