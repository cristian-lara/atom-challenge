import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskFormService } from '../../forms/task-form.service';
import { FormGroup } from '@angular/forms';
import { Task } from '@atom-challenge/shared';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false
})
export class TaskFormComponent {
  @Input() task?: Task;
  @Output() save = new EventEmitter<Partial<Task>>();
  taskForm: FormGroup;

  constructor(private taskFormService: TaskFormService) {
    this.taskForm = this.taskFormService.createForm();
  }

  ngOnChanges() {
    if (this.task) {
      this.taskForm = this.taskFormService.createForm(this.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.save.emit(this.taskForm.value);
      this.taskForm.reset();
    }
  }
} 