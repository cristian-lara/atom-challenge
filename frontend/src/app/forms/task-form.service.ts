import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '@atom-challenge/shared';

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  constructor(private fb: FormBuilder) {}

  createForm(task?: Partial<Task>): FormGroup {
    return this.fb.group({
      title: [task?.title ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [task?.description ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }
} 