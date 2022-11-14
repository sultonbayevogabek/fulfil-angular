import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../admin/shared/services/auth.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import * as events from 'events';

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {
   constructor(
      private _authService: AuthService,
      private _router: Router,
      private _loader: LoaderService
   ) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loader.show();

      if (this._authService.token) {
         req = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + this._authService.token)
         });
      }
      return next.handle(req)
         .pipe(
            tap(events => {
               if (events.type) {
                  this._loader.hide();
               }
            }),
            catchError(err => {
               if (err.status === 400) {
                  this._loader.hide();
               }
               if (err.status === 401) {
                  this._router.navigate(['admin', 'login']).then();
               }
               return throwError(err);
            })
         );
   }
}
