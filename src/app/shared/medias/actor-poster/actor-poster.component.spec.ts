import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorPosterComponent } from './actor-poster.component';

describe('ActorPosterComponent', () => {
  let component: ActorPosterComponent;
  let fixture: ComponentFixture<ActorPosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorPosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
