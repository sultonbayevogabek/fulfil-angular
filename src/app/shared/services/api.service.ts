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
import { IEmployedStudent, IFaq, IHeader, IIntroLesson } from '../models/models';

@Injectable({
   providedIn: 'root'
})

export class ApiService {
   constructor(
      private http: HttpClient
   ) {
   }

   login(payload: ILoginRequest) {
      return this.http.post<ILoginResponse>(environment.host + '/api/v1/auth/signin', payload);
   }

   getAdmin() {
      return this.http.get<ICurrentUser>(environment.host + '/api/v1/auth/currentuser')
         .pipe(
            map(res => res.data)
         );
   }

   getHeader() {
      return this.http.get<{ data: IHeader, status: number }>(environment.host + '/api/v1/header')
         .pipe(
            map(res => res.data)
         );
   }

   createHeader(payload: IHeader) {
      return this.http.post(environment.host + '/api/v1/header', payload);
   }

   updateHeader(payload: IHeader) {
      return this.http.put(environment.host + '/api/v1/header', payload);
   }

   changePassword(payload: IChangePassword) {
      return this.http.put(environment.host + '/api/v1/auth/updatepassword', payload);
   }

   createFaq(payload: IFaq) {
      return this.http.post(environment.host + '/api/v1/faq', payload);
   }

   getFaqList() {
      return this.http.get<{ status: number; data: IFaq[] }>(environment.host + '/api/v1/faq');
   }

   deleteFaq(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/faq/${id}`);
   }

   createIntroLesson(payload: IIntroLesson) {
      return this.http.post(environment.host + '/api/v1/register-free-lesson/lessons', payload);
   }

   getIntroLessonsList() {
      return this.http.get<{ status: number; data: IIntroLesson[] }>(environment.host + '/api/v1/register-free-lesson/lessons');
   }

   deleteIntroLesson(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/register-free-lesson/lessons/${id}`);
   }

   enrollCourse(payload: IEnrollCourse) {
      return this.http.post<{ success: boolean }>(environment.host + `/api/v1/register-free-lesson`, payload);
   }

   getIntroLessonsRegistrations() {
      return this.http.get<{ status: number; data: IEnrollCourse[] }>(environment.host + '/api/v1/register-free-lesson');
   }

   deleteIntroLessonRegistration(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/register-free-lesson/${id}`);
   }

   createEmployedStudent(payload: FormData) {
      return this.http.post<{ status: number; data: IEmployedStudent }>(environment.host + `/api/v1/student`, payload);
   }

   deleteEmployedStudent(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/student/${id}`);
   }

   getEmployedStudents() {
      return this.http.get<{ status: number; data: IEmployedStudent[] }>(environment.host + '/api/v1/student');
   }

}
