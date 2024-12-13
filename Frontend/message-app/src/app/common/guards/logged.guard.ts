import { AuthService } from '@/app/services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = authService.isLoggedIn()
  
  if(isLoggedIn) {
    router.navigateByUrl('')
  }

  return !isLoggedIn
};
