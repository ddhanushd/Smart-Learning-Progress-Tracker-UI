import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../core/services/topicservice';
import { ApiResponse } from '../../../core/models/api-response.model';

type TopicStatsModel = {
  totalTopics: number;
  strongCount: number;
  averageCount: number;
  weakCount: number;
};

@Component({
  selector: 'app-topic-stats',
  imports: [],
  templateUrl: './topic-stats.html',
  styleUrl: './topic-stats.scss',
})
export class TopicStats implements OnInit {

  stats?: TopicStatsModel;
  loading = true;
  error = '';

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
   this.topicService.getStats().subscribe({
  next: (res: ApiResponse<TopicStatsModel>) => {
    this.loading = false;
    if (res.success) {
      this.stats = res.data;
    } else {
      this.error = 'Failed to load stats';
    }
  },
  error: () => {
    this.loading = false;
    this.error = 'Server error loading stats';
  }
});

  }


}
