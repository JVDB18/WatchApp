import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedShowsComponent } from './watched-shows.component';

describe('WatchedShowsComponent', () => {
  let component: WatchedShowsComponent;
  let fixture: ComponentFixture<WatchedShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
