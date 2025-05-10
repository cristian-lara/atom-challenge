import { Injectable } from '@angular/core';

export const USER_EMAIL_KEY = 'atom-user-email';

@Injectable({ providedIn: 'root' })
export class UserStorageService {
  setEmail(email: string) {
    localStorage.setItem(USER_EMAIL_KEY, email);
  }

  getEmail(): string | null {
    return localStorage.getItem(USER_EMAIL_KEY);
  }

  clearEmail() {
    localStorage.removeItem(USER_EMAIL_KEY);
  }
} 