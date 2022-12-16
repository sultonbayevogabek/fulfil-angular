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
import { map } from 'rxjs';
import {
   IComment,
   ICompany, IContact, ICourse,
   IEmployedStudent,
   IFaq,
   IHeader,
   IMentor,
   IRecordedIntroLesson,
   IStudentProject
} from '../models/models';

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

   deleteIntroLesson(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/register-free-lesson/lessons/${id}`);
   }

   enrollCourse(payload: IEnrollCourse) {
      return this.http.post<{ success: boolean }>(environment.host + `/api/v1/register-free-lesson`, payload);
   }

   getCourseRegistrations() {
      return this.http.get<{ status: number; data: IEnrollCourse[] }>(environment.host + '/api/v1/register-free-lesson');
   }

   deleteCourseRegistration(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/register-free-lesson/${id}`);
   }

   createEmployedStudent(payload: FormData) {
      return this.http.post<{ status: number; data: IEmployedStudent }>(environment.host + `/api/v1/student`, payload);
   }

   deleteEmployedStudent(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/student/${id}`);
   }

   getEmployedStudents(page: number = 1, limit: number = 9) {
      return this.http.post<{ status: number; data: IEmployedStudent[] }>(environment.host + '/api/v1/student/page', { page, limit });
   }

   createCompany(payload: FormData) {
      return this.http.post<{ status: number; data: ICompany }>(environment.host + `/api/v1/company-logo`, payload);
   }

   getCompanies() {
      return this.http.get<{ status: number; data: ICompany[] }>(environment.host + '/api/v1/company-logo');
   }

   deleteCompany(id: string) {
      return this.http.delete<{ status: number; data: {} }>(environment.host + `/api/v1/company-logo/${id}`);
   }

   createMentor(payload: FormData) {
      return this.http.post(environment.host + `/api/v1/teacher`, payload);
   }

   getMentors() {
      return this.http.get<{ status: number; data: IMentor[] }>(environment.host + '/api/v1/teacher');
   }

   deleteMentor(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/teacher/${id}`);
   }

   createStudentProject(payload: FormData) {
      return this.http.post<{ status: number; data: IStudentProject }>(environment.host + `/api/v1/student-project`, payload);
   }

   getStudentsProjects() {
      return this.http.get<{ status: number; data: IStudentProject[] }>(environment.host + '/api/v1/student-project');
   }

   deleteStudentProject(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/student-project/${id}`);
   }

   createRecordedIntroLesson(payload: FormData) {
      return this.http.post<{ status: number; data: IRecordedIntroLesson }>(environment.host + `/api/v1/free-lesson`, payload);
   }

   getRecordedIntroLessons() {
      return this.http.get<{ status: number; data: IRecordedIntroLesson[] }>(environment.host + '/api/v1/free-lesson');
   }

   deleteRecordedIntroLesson(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/free-lesson/${id}`);
   }

   sendContact(payload: IContact) {
      return this.http.post<{ status: number; data: IContact }>(environment.host + `/api/v1/contact`, payload);
   }

   getContacts() {
      return this.http.get<{ status: number; data: IContact[] }>(environment.host + `/api/v1/contact`);
   }

   deleteContact(id: string) {
      return this.http.delete<{ success: boolean }>(environment.host + `/api/v1/contact/${id}`);
   }

   createCourse(payload: FormData) {
      return this.http.post<{ status: number; data: ICourse }>(environment.host + '/api/v1/course', payload);
   }

   getCourses() {
      return this.http.get<{ status: number; data: ICourse[] }>(environment.host + '/api/v1/course');
   }

   getCourseBySlug(slug: string) {
      return this.http.get<{ status: number; data: ICourse }>(environment.host + `/api/v1/course/${slug}`);
   }

   editCourse(id: string, payload: FormData) {
      return this.http.put<{ status: number; data: ICourse }>(environment.host + `/api/v1/course/${id}`, payload);
   }

   deleteCourse(id: string) {
      return this.http.delete<{ status: number; data: {} }>(environment.host + `/api/v1/course/${id}`);
   }

   createComment(id: string, payload: FormData) {
      return this.http.post<{ status: number; data: IComment }>(environment.host + `/api/v1/comment/${id}`, payload);
   }

   getComments() {
      return this.http.get<{ status: number; data: IComment[] }>(environment.host + `/api/v1/comment`);
   }

   getCommentsByCourseId(id: string) {
      return this.http.get<{ status: number; data: IComment[] }>(environment.host + `/api/v1/comment/${id}`);
   }

   deleteComment(id: string) {
      return this.http.delete<{ status: number; data: {} }>(environment.host + `/api/v1/comment/${id}`);
   }

   createHomePageComment(payload: FormData) {
      return this.http.post<{ status: number; data: IComment }>(environment.host + `/api/v1/company-comments`, payload);
   }

   getHomePageComments() {
      return this.http.get<{ status: number; data: IComment[] }>(environment.host + `/api/v1/company-comments`);
   }

   deleteHomePageComment(id: string) {
      return this.http.delete<{ status: number; data: {} }>(environment.host + `/api/v1/company-comments/${id}`);
   }
}
