import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-create-user-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Usuario no encontrado</h2>
      <mat-dialog-content>
        <p class="dialog-message">¿Deseas crear un nuevo usuario con este correo?</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close="false">Cancelar</button>
        <button mat-button color="primary" mat-dialog-close="true" cdkFocusInitial>Crear</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 1.5rem 1rem 1rem 1rem;
      max-width: 90vw;
      min-width: 250px;
      box-sizing: border-box;
      text-align: center;
    }
    h2[mat-dialog-title] {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #1976d2;
    }
    .dialog-message {
      font-size: 1rem;
      color: #333;
      margin: 0 0 1.5rem 0;
    }
    mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    @media (max-width: 480px) {
      .dialog-container {
        padding: 1rem 0.5rem 0.5rem 0.5rem;
        min-width: 0;
      }
      h2[mat-dialog-title] {
        font-size: 1.1rem;
      }
      .dialog-message {
        font-size: 0.95rem;
      }
      mat-dialog-actions {
        flex-direction: column;
        gap: 0.5rem;
        align-items: stretch;
      }
    }
  `],
  standalone: true,
  imports: [MatDialogModule]
})
export class ConfirmCreateUserDialogComponent {} 