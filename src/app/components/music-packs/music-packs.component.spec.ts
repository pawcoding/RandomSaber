import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPacksComponent } from './music-packs.component';

describe('MusicPacksComponent', () => {
  let component: MusicPacksComponent;
  let fixture: ComponentFixture<MusicPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicPacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
