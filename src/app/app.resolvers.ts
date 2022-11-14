import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IEmployedStudent, ITeacher } from './shared/models/models';
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

@Injectable({
   providedIn: 'root'
})
export class TeachersResolver implements Resolve<{ status: number; data: ITeacher[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: ITeacher[] }> {
      return this._apiService.getTeachers();
   }
}
