import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { ICurrentUser, ILoginRequest, ILoginResponse } from '../models/auth.models'
import { map, Observable } from 'rxjs'

@Injectable()

export class AdminApiService {
   host = environment.host

   constructor(
      private http: HttpClient
   ) {
   }

   login(payload: ILoginRequest) {
      return this.http.post<ILoginResponse>(this.host + '/auth/signin', payload)
   }

   getCurrentUser() {
      return this.http.get<ICurrentUser>(this.host + '/auth/currentuser')
         .pipe(
            map(res => res.data)
         )
   }
}
