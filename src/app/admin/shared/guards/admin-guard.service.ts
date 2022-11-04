import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../../../shared/services/api.service';

@Injectable()

export class AdminGuardService implements CanActivate {
   constructor(
      private _authService: AuthService,
      private _adminApiService: ApiService,
      private _router: Router
   ) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this._authService.token) {
         this._router.navigate(['admin', 'login']).then();
         return false;
      }

      if (!this._authService.admin) {
         this._authService.getAdmin();
      }

      return true;
   }
}
