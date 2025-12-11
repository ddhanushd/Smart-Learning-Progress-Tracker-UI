import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { Revision, Topic } from '../../../core/models/topic.model';
import { TopicService } from '../../../core/services/topicservice';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic-list',
  imports: [CommonModule, ReactiveFormsModule],
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
        return response.data ?? [];
      }),
      shareReplay(1)
    );

    // ensure loading flag clears on first emission
    this.topics$.subscribe({ next: () => { this.loading = false; }, error: () => { this.loading = false; } });
  }

  getLastRevision(topic: Topic): Revision | undefined {
    return topic.revisions && topic.revisions.length ? topic.revisions[topic.revisions.length - 1] : undefined;
  }
}
