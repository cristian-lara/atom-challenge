import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '@atom-challenge/shared';
import { NotificationService } from '../../shared/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: false
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(
    private taskService: TaskService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.notification.error('Error al cargar las tareas');
        this.loading = false;
      }
    });
  }

  trackByTaskId(index: number, task: Task) {
    return task.id;
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '100%',
      maxWidth: '400px',
      autoFocus: false,
      data: null,
      panelClass: 'task-dialog-panel'
    });

    dialogRef.componentInstance.save.subscribe((taskData: Partial<Task>) => {
      dialogRef.close();
      this.loading = true;
      this.taskService.create(taskData).subscribe({
        next: (task) => {
          this.notification.success('Tarea creada correctamente');
          this.tasks = [task, ...this.tasks];
          this.loading = false;
        },
        error: () => {
          this.notification.error('Error al crear la tarea');
          this.loading = false;
        }
      });
    });
  }
} 