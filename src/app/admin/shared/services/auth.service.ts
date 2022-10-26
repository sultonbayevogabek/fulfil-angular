import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { IAdmin } from '../models/auth.models'

@Injectable()

export class AuthService {
   constructor(private _adminApiService: ApiService) {
   }

   private _admin = null

   get token(): string | null {
      return localStorage.getItem('token')
   }

   set admin(admin: IAdmin) {
      this._admin = admin
   }

   get admin() {
      return this._admin
   }

   getAdmin() {
      this._adminApiService.getAdmin().subscribe(res => this._admin = res, _ => {})
   }
}
