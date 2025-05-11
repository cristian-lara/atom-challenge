import { Component } from '@angular/core';
import { UserFormService } from '../../forms/user-form.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../../shared/notification/notification.service';
import { getFormErrorMessage } from '../../shared/form-error/form-error.util';
import { LoaderService } from '../../shared/loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCreateUserDialogComponent } from '../confirm-create-user-dialog.component';
import { UserStorageService } from '../../shared/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  public getFormErrorMessage = getFormErrorMessage;

  get emailControl() {
    return this.loginForm.get('email') ?? this.userFormService.createForm().get('email');
  }

  constructor(
    private userFormService: UserFormService,
    private userService: UserService,
    private router: Router,
    private notification: NotificationService,
    public loaderService: LoaderService,
    private dialog: MatDialog,
    private userStorage: UserStorageService
  ) {
    this.loginForm = this.userFormService.createForm();
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) return;
    const email = this.emailControl?.value ?? '';
    this.userService.getByEmail(email).subscribe({
      next: (user) => {
        this.userStorage.setEmail(email);
        this.notification.success('¡Bienvenido!');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        // Usuario no existe, mostrar diálogo de confirmación
        this.openCreateUserDialog(email);
      }
    });
  }

  openCreateUserDialog(email: string) {
    const dialogRef = this.dialog.open(ConfirmCreateUserDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true || result === 'true') {
        this.userService.create({ email }).subscribe({
          next: () => {
            this.userStorage.setEmail(email);
            this.notification.success('Usuario creado exitosamente');
            this.router.navigate(['/tasks']);
          },
          error: () => {
            this.error = 'No se pudo crear el usuario.';
            this.notification.error(this.error);
          }
        });
      } else {
        this.notification.info('Creación de usuario cancelada');
      }
    });
  }
}
