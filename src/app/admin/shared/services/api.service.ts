import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { ICurrentUser, ILoginRequest, ILoginResponse } from '../models/auth.models'
import { map } from 'rxjs'
import { IHeader } from '../models/cabinet.models'

@Injectable({
   providedIn: 'root'
})

export class ApiService {
   constructor(
      private http: HttpClient
   ) {}

   login(payload: ILoginRequest) {
      return this.http.post<ILoginResponse>(environment.host + '/auth/signin', payload)
   }

   getAdmin() {
      return this.http.get<ICurrentUser>(environment.host + '/auth/currentuser')
         .pipe(
            map(res => res.data)
         )
   }

   getHeader() {
      return this.http.get<{ data: IHeader, status: number }>(environment.host + '/header')
         .pipe(
            map(res => res.data)
         )
   }

   createHeader(payload: IHeader) {
      return this.http.post(environment.host + '/header', payload)
   }

   updateHeader(payload: IHeader) {
      return this.http.put(environment.host + '/header', payload)
   }
}
