import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ICompany, IContact, ICourse, IFaq, IIntroLesson } from '../../shared/models/models';
import { ApiService } from '../../shared/services/api.service';
import { IEnrollCourse } from '../shared/models/models';

@Injectable()
export class FaqResolver implements Resolve<{ status: number; data: IFaq[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IFaq[] }> {
      return this._apiService.getFaqList();
   }
}

@Injectable()
export class IntroLessonResolver implements Resolve<{ status: number; data: IIntroLesson[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IIntroLesson[] }> {
      return this._apiService.getIntroLessonsList();
   }
}

@Injectable()
export class IntroLessonsRegistrationsResolver implements Resolve<{ status: number; data: IEnrollCourse[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IEnrollCourse[] }> {
      return this._apiService.getIntroLessonsRegistrations();
   }
}

@Injectable()
export class CompaniesResolver implements Resolve<{ status: number; data: ICompany[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: ICompany[] }> {
      return this._apiService.getCompanies();
   }
}

@Injectable()
export class ContactsResolver implements Resolve<{ status: number; data: IContact[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IContact[] }> {
      return this._apiService.getContacts();
   }
}

@Injectable()
export class CommentsResolver implements Resolve<{ status: number; data: any }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: any }> {
      return this._apiService.getComments();
   }
}

@Injectable()
export class CoursesResolver implements Resolve<{ status: number; data: ICourse[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: ICourse[] }> {
      return this._apiService.getCourses();
   }
}
