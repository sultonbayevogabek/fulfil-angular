import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ICompany, IFaq, IIntroLesson } from '../../shared/models/models';
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
