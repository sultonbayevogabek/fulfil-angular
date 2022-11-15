import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IEmployedStudent, IMentor, IStudentProject } from './shared/models/models';
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
export class MentorsResolver implements Resolve<{ status: number; data: IMentor[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IMentor[] }> {
      return this._apiService.getMentors();
   }
}

@Injectable({
   providedIn: 'root'
})
export class StudentsProjectsResolver implements Resolve<{ status: number; data: IStudentProject[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IStudentProject[] }> {
      return this._apiService.getStudentsProjects();
   }
}

@Injectable({
   providedIn: 'root'
})
export class RecordedIntroLessonsResolver implements Resolve<any> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<any> {
      return this._apiService.getRecordedIntroLessons();
   }
}
