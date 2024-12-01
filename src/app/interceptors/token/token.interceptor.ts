import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, throwError } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'

const API_URLS_NOT_NEED_TOKEN = ['login', 'register', 'reset-password'];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si requete sur API login, on laisse passer sans le jeton
  if(checkAPIUrlNotNeedToken(req.url)) return next(req);

  // Si authentifié, on ajoute le jeton
  if (authService.isAuthenticated) {
    const token = authService.token;
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(clonedRequest).pipe(
      catchError((error) => handleUnauthorizedError(error, authService, router))
    );
  }

  // Si l'utilisateur n'est pas authentifié, laissez la requête passer et gérez les erreurs
  return next(req).pipe(
    catchError((error) => handleUnauthorizedError(error, authService, router))
  );

};

function checkAPIUrlNotNeedToken(url: string): boolean {
  return API_URLS_NOT_NEED_TOKEN.some((apiUrl) => url.includes(apiUrl));
}

function handleUnauthorizedError(
  error: any,
  authService: AuthService,
  router: Router
) {
  if (error.status === 401) {
    console.warn('Erreur 401 détectée. Redirection vers /connexion.');
    authService.logout();
    router.navigateByUrl('/connexion');
  }
  return throwError(() => error); 
}

