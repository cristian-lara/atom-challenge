import { ValidationErrors } from '@angular/forms';

export function getFormErrorMessage(
  errors: ValidationErrors | null | undefined,
  customErrors?: { [key: string]: string }
): string {
  if (!errors) return '';
  const errorKey = Object.keys(errors)[0];
  if (customErrors && customErrors[errorKey]) {
    return customErrors[errorKey];
  }
  switch (errorKey) {
    case 'required':
      return 'Este campo es obligatorio';
    case 'email':
      return 'Ingresa un correo válido';
    case 'minlength':
      return 'El valor es demasiado corto';
    case 'maxlength':
      return 'El valor es demasiado largo';
    case 'pattern':
      return 'El formato no es válido';
    default:
      return 'Campo inválido';
  }
} 