import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Injectable()

export class AdminGuardService implements CanActivate {
   constructor(
      private authService: AuthService,
      private router: Router
   ) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return !!this.authService.currentUser
   }
}
