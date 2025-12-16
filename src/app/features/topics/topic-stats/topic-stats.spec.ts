import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicStats } from './topic-stats';

describe('TopicStats', () => {
  let component: TopicStats;
  let fixture: ComponentFixture<TopicStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
