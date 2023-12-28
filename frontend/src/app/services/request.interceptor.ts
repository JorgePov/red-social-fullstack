import { HttpInterceptorFn } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const destroyRef = inject(DestroyRef)
  const currentUser = inject(AuthService).getUserData();

  if (currentUser && currentUser.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
  }

  return next(req)
};
