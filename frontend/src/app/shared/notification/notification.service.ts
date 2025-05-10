import { Injectable } from '@angular/core';
import { NotificationMaterialAdapter } from './notification-material.adapter';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly adapter: NotificationMaterialAdapter) {}

  success(message: string, detail?: string): void {
    this.adapter.success(message, detail);
  }
  error(message: string, detail?: string): void {
    this.adapter.error(message, detail);
  }
  info(message: string, detail?: string): void {
    this.adapter.info(message, detail);
  }
  warn(message: string, detail?: string): void {
    this.adapter.warn(message, detail);
  }
} 