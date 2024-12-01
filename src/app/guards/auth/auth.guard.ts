import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (!authService.isAuthenticated){
    console.log('casse toi')
    return router.navigateByUrl('/connexion')
  }
  
  return true;
};
