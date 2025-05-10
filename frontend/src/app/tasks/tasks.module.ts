import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    TasksRoutingModule
  ],
  exports: [TaskListComponent, TaskFormComponent]
})
export class TasksModule {} 