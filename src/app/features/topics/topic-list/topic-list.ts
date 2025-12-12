import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { Revision, Topic } from '../../../core/models/topic.model';
import { TopicService } from '../../../core/services/topicservice';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

type EditState = {
  open: boolean;
  confidence: number | null;
  note: string;
  submitting: boolean;
  error?: string;
};

@Component({
  selector: 'app-topic-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList implements OnInit {

  // BehaviorSubject holds the current list and enables instant updates
  private topicsSubject = new BehaviorSubject<Topic[]>([]);
  topics$ = this.topicsSubject.asObservable();

  loading = false;
  errorMessage = '';

  // per-topic edit state
  editStates: Record<string, EditState> = {};

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.loading = true;
    this.errorMessage = '';

    this.topicService.getAllTopics().pipe(
      map(response => {
        this.loading = false;
        if (!response || !response.success) {
          this.errorMessage = response?.message || 'Failed to load topics';
          return [];
        }
        return response.data ?? [];
      })
    ).subscribe({
      next: (list) => {
        this.topicsSubject.next(list);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.message || 'Failed to load topics';
        this.topicsSubject.next([]);
        this.loading = false;
      }
    });
  }

  // Open revise UI for a topic (pre-fill confidence and reset note)
  openRevise(topic: Topic): void {
    this.editStates[topic.id] = {
      open: true,
      confidence: topic.confidence ?? 50,
      note: '',
      submitting: false,
      error: undefined
    };
  }

  cancelRevise(topicId: string): void {
    delete this.editStates[topicId];
  }

  // Submit revise for a topic — updates BehaviorSubject in-place on success
  submitRevise(topicId: string): void {
    const state = this.editStates[topicId];
    if (!state) return;

    // validation: confidence must be number 0-100
    const conf = Number(state.confidence ?? 0);
    if (isNaN(conf) || conf < 0 || conf > 100) {
      state.error = 'Confidence must be 0–100';
      return;
    }

    state.submitting = true;
    state.error = undefined;

    this.topicService.reviseTopic(topicId, conf, state.note || '').subscribe({
      next: (res) => {
        state.submitting = false;
        if (res?.success) {
          // If server returns the updated topic, update the list in-place
          if (res.data) {
            const current = this.topicsSubject.getValue();
            const updated = current.map(t => t.id === res.data.id ? res.data : t);
            this.topicsSubject.next(updated);
          } else {
            // fallback: reload entire list
            this.loadTopics();
          }
          // close editor
          delete this.editStates[topicId];
        } else {
          state.error = res?.message || 'Failed to revise';
        }
      },
      error: (err) => {
        state.submitting = false;
        state.error = err?.message || 'Server error while revising';
      }
    });
  }

  // mark complete; update subject in-place if server returns updated topic
  markComplete(id: string): void {
    this.topicService.markComplete(id).subscribe({
      next: res => {
        if (res?.success) {
          if (res.data) {
            const current = this.topicsSubject.getValue();
            const updated = current.map(t => t.id === res.data.id ? res.data : t);
            this.topicsSubject.next(updated);
          } else {
            this.loadTopics();
          }
        } else {
          this.errorMessage = res?.message || 'Unable to mark complete';
        }
      },
      error: err => {
        this.errorMessage = err?.message || 'Server error while marking complete';
      }
    });
  }

  getLastRevision(topic: Topic): Revision | undefined {
    return topic.revisions && topic.revisions.length ? topic.revisions[topic.revisions.length - 1] : undefined;
  }

}
