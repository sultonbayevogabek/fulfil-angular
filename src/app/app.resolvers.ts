import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {
   ICourse,
   IEmployedStudent,
   IHeader,
   IMentor,
   IRecordedIntroLesson,
   IStudentProject
} from './shared/models/models';
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
export class RecordedIntroLessonsResolver implements Resolve<{ status: number; data: IRecordedIntroLesson[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IRecordedIntroLesson[] }> {
      return this._apiService.getRecordedIntroLessons();
   }
}

@Injectable({
   providedIn: 'root'
})
export class HeaderResolver implements Resolve<IHeader> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<IHeader> {
      return this._apiService.getHeader();
   }
}

@Injectable({
   providedIn: 'root'
})
export class CourseResolver implements Resolve<{ status: number; data: ICourse }> {
   constructor(
      private _apiService: ApiService,
      private _route: ActivatedRoute
   ) {
   }

   resolve(route: ActivatedRouteSnapshot): Observable<{ status: number; data: ICourse }> {
      const id = route.params['id'];
      return this._apiService.getCourseById(id);
   }
}
