import { Component } from '@angular/core';
import { UserFormService } from '../../forms/user-form.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../../shared/notification/notification.service';
import { getFormErrorMessage } from '../../shared/form-error/form-error.util';
import { LoaderService } from '../../shared/loader/loader.service';

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
    public loaderService: LoaderService
  ) {
    this.loginForm = this.userFormService.createForm();
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) return;
    const email = this.emailControl?.value ?? '';
    this.userService.create({ email }).subscribe({
      next: () => {
        this.notification.success('¡Ingreso exitoso!');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.error = 'Error al iniciar sesión. Intenta de nuevo.';
        this.notification.error(this.error);
      }
    });
  }
} 