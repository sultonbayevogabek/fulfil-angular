import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
   IChangePassword,
   ICurrentUser,
   IEnrollCourse,
   ILoginRequest,
   ILoginResponse
} from '../../admin/shared/models/models';
import { map, tap } from 'rxjs';
import { IFaq, IHeader, IIntroLesson } from '../models/models';

@Injectable({
   providedIn: 'root'
})

export class ApiService {
   constructor(
      private http: HttpClient
   ) {
   }

   login(payload: ILoginRequest) {
      return this.http.post<ILoginResponse>(environment.host + '/auth/signin', payload);
   }

   getAdmin() {
      return this.http.get<ICurrentUser>(environment.host + '/auth/currentuser')
         .pipe(
            map(res => res.data)
         );
   }

   getHeader() {
      return this.http.get<{ data: IHeader, status: number }>(environment.host + '/header')
         .pipe(
            map(res => res.data)
         );
   }

   createHeader(payload: IHeader) {
      return this.http.post(environment.host + '/header', payload);
   }

   updateHeader(payload: IHeader) {
      return this.http.put(environment.host + '/header', payload);
   }

   changePassword(payload: IChangePassword) {
      return this.http.put(environment.host + '/auth/updatepassword', payload);
   }

   createFaq(payload: IFaq) {
      return this.http.post(environment.host + '/faq', payload);
   }

   getFaqList() {
      return this.http.get<{ status: number; data: IFaq[] }>(environment.host + '/faq');
   }

   deleteFaq(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/faq/${id}`);
   }

   createIntroLesson(payload: IIntroLesson) {
      return this.http.post(environment.host + '/register-free-lesson/lessons', payload);
   }

   getIntroLessonsList() {
      return this.http.get<{ status: number; data: IIntroLesson[] }>(environment.host + '/register-free-lesson/lessons');
   }

   deleteIntroLesson(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/register-free-lesson/lessons/${id}`);
   }

   enrollCourse(payload: IEnrollCourse) {
      return this.http.post<{ success: boolean }>(environment.host + `/register-free-lesson`, payload);
   }

   getIntroLessonsRegistrations() {
      return this.http.get<{ status: number; data: IEnrollCourse[] }>(environment.host + '/register-free-lesson');
   }

   deleteIntroLessonRegistration(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/register-free-lesson/${id}`);
   }
}
