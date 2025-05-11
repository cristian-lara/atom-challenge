import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.show();
  return next(req).pipe(
    catchError((error) => throwError(() => error)),
    finalize(() => loaderService.hide())
  );
}; 