import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Revision, Topic } from '../../../core/models/topic.model';
import { TopicService } from '../../../core/services/topicservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-list',
  imports: [CommonModule],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList implements OnInit {

  topics$!: Observable<Topic[]>;
  loading = false;
  errorMessage = '';

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.loading = true;
    this.errorMessage = '';

    this.topics$ = this.topicService.getAllTopics().pipe(
      map(response => {
        this.loading = false;
        if (!response.success) {
          this.errorMessage = response.message || 'Failed to load topics';
          return [];
        }
        return response.data;
      })
    );
  }

   getLastRevision(topic: Topic): Revision | undefined {
    return topic.revisions && topic.revisions.length
      ? topic.revisions[topic.revisions.length - 1]
      : undefined;
  }

}
