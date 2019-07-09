import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsWatchlistComponent } from './shows-watchlist.component';

describe('ShowsWatchlistComponent', () => {
  let component: ShowsWatchlistComponent;
  let fixture: ComponentFixture<ShowsWatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsWatchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
