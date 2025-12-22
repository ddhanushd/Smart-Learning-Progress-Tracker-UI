import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAccessToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));

  if (payload.role === 'ADMIN') {
    return true;
  }

  router.navigate(['/topics']); // no access → redirect
  return false;
};
