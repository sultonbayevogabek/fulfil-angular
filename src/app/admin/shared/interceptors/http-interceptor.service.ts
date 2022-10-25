import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core'

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {
   constructor(
      private authService: AuthService
   ) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler) {
      req = req.clone({
         headers: req.headers.append('Authorization', 'Bearer ' + this.authService.token)
      })
      return next.handle(req)
   }
}
