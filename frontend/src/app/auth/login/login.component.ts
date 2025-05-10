import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.valid) {
      this.loading = true;
      const email = this.loginForm.value.email;
      this.userService.create({ email }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Error al iniciar sesión. Intenta de nuevo.';
        }
      });
    }
  }
} 