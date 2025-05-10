import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { User } from '@atom-challenge/shared';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseHttpService<User> {
  constructor(http: HttpClient) {
    super(http, '/api/users');
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(`/api/users/${email}`);
  }
} 