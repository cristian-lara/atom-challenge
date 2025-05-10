import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '@atom-challenge/shared';
import { NotificationService } from '../../shared/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: false
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  searchTerm = '';
  selectedTask?: Task;

  get pendingTasks(): Task[] {
    return this.filteredTasks.filter(t => !t.completed);
  }

  get completedTasks(): Task[] {
    return this.filteredTasks.filter(t => t.completed);
  }

  get filteredTasks(): Task[] {
    if (!this.searchTerm.trim()) return this.tasks;
    const term = this.searchTerm.trim().toLowerCase();
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
    );
  }

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

  completeTask(task: Task) {
    if (!task.id) return;
    this.taskService.update(task.id, { completed: true }).subscribe({
      next: (updated) => {
        this.tasks = this.tasks.map(t => t.id === task.id ? { ...t, completed: true } : t);
        this.notification.success('Tarea marcada como completada');
      },
      error: () => {
        this.notification.error('No se pudo completar la tarea');
      }
    });
  }

  completeAll() {
    this.pendingTasks.forEach(task => this.completeTask(task));
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '100%',
      maxWidth: '400px',
      autoFocus: false,
      data: { task },
      panelClass: 'task-dialog-panel'
    });

    dialogRef.componentInstance.task = task;

    dialogRef.componentInstance.save.subscribe((taskData: Partial<Task>) => {
      dialogRef.close();
      if (!task.id) return;
      this.loading = true;
      this.taskService.update(task.id, taskData).subscribe({
        next: (updated) => {
          this.notification.success('Tarea actualizada correctamente');
          this.tasks = this.tasks.map(t => t.id === task.id ? { ...t, ...taskData } : t);
          this.loading = false;
        },
        error: () => {
          this.notification.error('Error al actualizar la tarea');
          this.loading = false;
        }
      });
    });
  }

  deleteTask(task: Task) {
    if (!task.id) return;
    this.taskService.delete(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.notification.success('Tarea eliminada');
      },
      error: () => {
        this.notification.error('No se pudo eliminar la tarea');
      }
    });
  }

  reopenAll() {
    this.completedTasks.forEach(task => this.reopenTask(task));
  }

  reopenTask(task: Task) {
    if (!task.id) return;
    this.taskService.update(task.id, { completed: false }).subscribe({
      next: () => {
        this.tasks = this.tasks.map(t => t.id === task.id ? { ...t, completed: false } : t);
        this.notification.success('Tarea reabierta');
      },
      error: () => {
        this.notification.error('No se pudo reabrir la tarea');
      }
    });
  }
} 