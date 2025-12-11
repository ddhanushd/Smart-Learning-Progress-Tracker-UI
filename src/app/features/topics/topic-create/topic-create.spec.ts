import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCreate } from './topic-create';

describe('TopicCreate', () => {
  let component: TopicCreate;
  let fixture: ComponentFixture<TopicCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
