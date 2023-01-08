import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPlayComponent } from './to-play.component';

describe('ToPlayComponent', () => {
  let component: ToPlayComponent;
  let fixture: ComponentFixture<ToPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
