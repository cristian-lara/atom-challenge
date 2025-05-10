import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '@atom-challenge/shared';

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  constructor(private fb: FormBuilder) {}

  createForm(task?: Partial<Task>): FormGroup {
    return this.fb.group({
      title: [task?.title ?? '', Validators.required],
      description: [task?.description ?? '', Validators.required],
      completed: [task?.completed ?? false]
    });
  }
} 