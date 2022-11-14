import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IEmployedStudent } from './shared/models/models';
import { ApiService } from './shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class EmployedStudentsResolver implements Resolve<{ status: number; data: IEmployedStudent[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IEmployedStudent[] }> {
      return this._apiService.getEmployedStudents();
   }
}
