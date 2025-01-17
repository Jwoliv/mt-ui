import {inject} from '@angular/core';
import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtTokenService} from "../jwt-token.service";

export const redirectToLoginInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem(JwtTokenService.TOKEN_NAME);
        router.navigate(['/login']).then();
      }
      return throwError(() => error);
    })
  );
};
