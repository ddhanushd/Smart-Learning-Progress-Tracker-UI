import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { Revision, Topic } from '../../../core/models/topic.model';
import { TopicService } from '../../../core/services/topicservice';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type EditState = {
  open: boolean;
  confidence: number | null;
  note: string;
  submitting: boolean;
  error?: string;
};

type SortOption =
  | ''
  | 'conf-desc'
  | 'conf-asc'
  | 'deadline-nearest'
  | 'name-asc'
  | 'name-desc';


@Component({
  selector: 'app-topic-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './topic-list.html',
  styleUrl: './topic-list.scss',
})
export class TopicList implements OnInit {

 private originalList: Topic[] = [];
  private topicsSubject = new BehaviorSubject<Topic[]>([]);
  topics$ = this.topicsSubject.asObservable();

  loading = false;
  errorMessage = '';

  editStates: Record<string, EditState> = {};
  completingIds = new Set<string>();

  searchTerm = '';
  sortBy: SortOption = '';


  constructor(private topicService: TopicService, private router: Router) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  /* ================= Load ================= */

  loadTopics(): void {
    this.loading = true;
    this.errorMessage = '';

    this.topicService.getAllTopics().subscribe({
      next: res => {
        this.loading = false;
        if (!res?.success) {
          this.errorMessage = res?.message || 'Failed to load topics';
          return;
        }
        this.originalList = res.data ?? [];
        this.applyFiltersAndSort();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Server error loading topics';
      }
    });
  }

  /* ================= Search & Sort ================= */

  onSearchChange(value: string): void {
    this.searchTerm = value ?? '';
    this.applyFiltersAndSort();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFiltersAndSort();
  }

  onSortChange(value: string): void {
    this.sortBy = value as SortOption;
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort(): void {
    let list = [...this.originalList];

    const q = this.searchTerm.trim().toLowerCase();
    if (q) {
      list = list.filter(t =>
        (t.name ?? '').toLowerCase().includes(q)
      );
    }

    switch (this.sortBy) {
      case 'conf-desc':
        list.sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0));
        break;
      case 'conf-asc':
        list.sort((a, b) => (a.confidence ?? 0) - (b.confidence ?? 0));
        break;
      case 'deadline-nearest':
        list.sort((a, b) =>
          (a.deadline ? new Date(a.deadline).getTime() : Infinity) -
          (b.deadline ? new Date(b.deadline).getTime() : Infinity)
        );
        break;
      case 'name-asc':
        list.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
        break;
      case 'name-desc':
        list.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
        break;
    }

    this.topicsSubject.next(list);
  }

  /* ================= Toggle Complete ================= */

  toggleComplete(topic: Topic): void {
    if (this.completingIds.has(topic.id)) return;

    // If already completed → revert locally
    if (topic.completed) {
      this.originalList = this.originalList.map(t =>
        t.id === topic.id ? { ...t, completed: false } : t
      );
      this.applyFiltersAndSort();
      return;
    }

    // Otherwise → backend call
    this.completingIds.add(topic.id);

    this.topicService.markComplete(topic.id).subscribe({
      next: res => {
        this.completingIds.delete(topic.id);
        if (res?.success && res.data) {
          this.originalList = this.originalList.map(t =>
            t.id === res.data.id ? res.data : t
          );
          this.applyFiltersAndSort();
        }
      },
      error: () => {
        this.completingIds.delete(topic.id);
      }
    });
  }

  isCompleting(id: string): boolean {
    return this.completingIds.has(id);
  }

  /* ================= Revise ================= */

  openRevise(topic: Topic): void {
    this.editStates[topic.id] = {
      open: true,
      confidence: topic.confidence ?? 50,
      note: '',
      submitting: false
    };
  }

  cancelRevise(id: string): void {
    delete this.editStates[id];
  }

  submitRevise(id: string): void {
    const state = this.editStates[id];
    if (!state) return;

    state.submitting = true;
    state.error = undefined;

    this.topicService.reviseTopic(id, state.confidence!, state.note).subscribe({
      next: res => {
        state.submitting = false;
        if (res?.success && res.data) {
          this.originalList = this.originalList.map(t =>
            t.id === res.data.id ? res.data : t
          );
          this.applyFiltersAndSort();
          delete this.editStates[id];
        }
      },
      error: () => {
        state.submitting = false;
        state.error = 'Failed to revise topic';
      }
    });
  }

  getLastRevision(topic: Topic): Revision | undefined {
    return topic.revisions?.length
      ? topic.revisions[topic.revisions.length - 1]
      : undefined;
  }

goToDetail(id: string): void {
  this.router.navigate(['/topics', id]);
}
}
