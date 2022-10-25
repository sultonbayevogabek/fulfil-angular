import { Injectable } from '@angular/core'
import { AdminApiService } from './admin-api.service'
import { Router } from '@angular/router'

@Injectable()

export class AuthService {
   constructor(
      private adminApiService: AdminApiService,
      private router: Router
   ) {}

   private _currentUser = null

   get token(): string | null {
      return localStorage.getItem('token')
   }

   get currentUser() {
      return this._currentUser
   }

   getCurrentUser(): void {
      this.adminApiService.getCurrentUser()
         .subscribe(res => {
            this._currentUser = res
            this.router.navigate(['admin', 'cabinet'])
         })
   }
}
