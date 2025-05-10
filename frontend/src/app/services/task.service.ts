import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { Task } from '@atom-challenge/shared';

@Injectable({ providedIn: 'root' })
export class TaskService extends BaseHttpService<Task> {
  constructor(http: HttpClient) {
    super(http, '/api/tasks');
  }
} 