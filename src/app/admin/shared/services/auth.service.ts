import { Injectable } from '@angular/core';
import { ApiService } from '../../../common/services/api.service';
import { IAdmin } from '../models/models';

@Injectable({
   providedIn: 'root'
})

export class AuthService {
   constructor(private _adminApiService: ApiService) {
   }

   private _admin = null;

   get token(): string | null {
      return localStorage.getItem('token');
   }

   set admin(admin: IAdmin) {
      this._admin = admin;
   }

   get admin() {
      return this._admin;
   }

   getAdmin() {
      this._adminApiService.getAdmin().subscribe(res => this._admin = res);
   }
}
