import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../core/models/topic.model';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { ApiResponse } from '../../../core/models/api-response.model';
import { TopicService } from '../../../core/services/topicservice';

@Component({
  selector: 'app-topic-detail',
  imports: [ CommonModule],
   standalone: true,
  templateUrl: './topic-detail.html',
  styleUrl: './topic-detail.scss',
})
export class TopicDetail implements OnInit {

 topic?: Topic;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Invalid topic';
      this.loading = false;
      return;
    }

    this.topicService.getTopicById(id).subscribe({
      next: (res: any) => {
        this.topic = res.data ?? res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load topic';
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/topics']);
  }
}
