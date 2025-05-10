import { Component } from '@angular/core';
import { UserFormService } from '../../forms/user-form.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  get emailControl() {
    return this.loginForm.get('email') ?? this.userFormService.createForm().get('email');
  }

  constructor(
    private userFormService: UserFormService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.userFormService.createForm();
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) return;
    this.loading = true;
    const email = this.emailControl?.value ?? '';
    this.userService.create({ email }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al iniciar sesión. Intenta de nuevo.';
      }
    });
  }

  getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) return '';
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'Ingresa un correo válido';
    if (errors['minlength']) return 'El valor es demasiado corto';
    if (errors['maxlength']) return 'El valor es demasiado largo';
    if (errors['pattern']) return 'El formato no es válido';
    return 'Campo inválido';
  }
} 