import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationAdapter } from './notification-adapter';

@Injectable({ providedIn: 'root' })
export class NotificationMaterialAdapter implements NotificationAdapter {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, detail?: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
  error(message: string, detail?: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-error']
    });
  }
  info(message: string, detail?: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }
  warn(message: string, detail?: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3500,
      panelClass: ['snackbar-warn']
    });
  }
} 