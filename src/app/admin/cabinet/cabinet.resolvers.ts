import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IComment, ICompany, IContact, IFaq } from '../../shared/models/models';
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
export class CourseRegistrationsResolver implements Resolve<{ status: number; data: IEnrollCourse[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IEnrollCourse[] }> {
      return this._apiService.getCourseRegistrations();
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
export class CommentsResolver implements Resolve<{ status: number; data: IComment[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IComment[] }> {
      return this._apiService.getComments();
   }
}

@Injectable()
export class HomePageCommentsResolver implements Resolve<{ status: number; data: IComment[] }> {
   constructor(
      private _apiService: ApiService
   ) {
   }

   resolve(): Observable<{ status: number; data: IComment[] }> {
      return this._apiService.getHomePageComments();
   }
}
