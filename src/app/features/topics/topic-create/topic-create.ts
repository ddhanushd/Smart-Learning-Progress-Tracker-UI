import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicService } from '../../../core/services/topicservice';
import { Router } from '@angular/router';
import { Topic } from '../../../core/models/topic.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './topic-create.html',
  styleUrl: './topic-create.scss',
})
export class TopicCreate {

     createForm!: FormGroup;     // init in constructor
  submitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private topicService: TopicService,
    private router: Router
  ) {
    // initialize form here so `fb` is defined
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      confidence: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      deadline: ['']
    });
  }

  submitCreate(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    // safe extraction / coercion of form values to satisfy TS
    const fv = this.createForm.value;
    const name = (fv.name ?? '') as string;                      // validated non-empty by form
    const confidence = Number(fv.confidence ?? 0);               // coerce to number
    const deadline = fv.deadline ? String(fv.deadline) : undefined;

    const payload: Partial<Topic> = {
      name,
      confidence,
      deadline,
      completed: false,
      status: this.deriveStatus(confidence)
    };

    this.topicService.createTopic(payload).subscribe({
      next: res => {
        this.submitting = false;
        if (res.success) {
          this.successMessage = 'Topic created successfully';
          // navigate back to list after short delay
          setTimeout(() => this.router.navigate(['/topics']), 700);
        } else {
          this.errorMessage = res.message || 'Create failed';
        }
      },
      error: err => {
        this.submitting = false;
        this.errorMessage = err?.message || 'Server error while creating topic';
      }
    });
  }

  deriveStatus(confidence: number): Topic['status'] {
    if (confidence >= 80) return 'STRONG';
    if (confidence >= 50) return 'AVERAGE';
    return 'WEAK';
  }

  // inside TopicCreateComponent class
cancel(): void {
  // use Angular Router for navigation (better than window.location)
  this.router.navigate(['/topics']);
}

}
