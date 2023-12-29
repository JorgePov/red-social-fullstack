import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService).getUserData();
  const router = inject(Router);

  if (authService.token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
