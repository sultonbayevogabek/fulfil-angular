import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../admin/shared/services/auth.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {
   constructor(
      private _authService: AuthService,
      private _router: Router
   ) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this._authService.token) {
         req = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + this._authService.token)
         });
      }
      return next.handle(req)
         .pipe(catchError(err => {
            if (err.status === 401) {
               this._router.navigate(['admin', 'login']).then();
            }
            return throwError(err);
         }));
   }
}
