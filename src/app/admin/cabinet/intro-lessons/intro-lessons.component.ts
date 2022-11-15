import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IIntroLesson } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { IEnrollCourse } from '../../shared/models/models';

@Component({
   selector: 'app-admin-intro-lessons',
   templateUrl: './intro-lessons.component.html'
})

export class IntroLessonsComponent implements OnInit {
   introLessonForm: FormGroup;
   introLessonsList: IIntroLesson[] = [];
   introLessonsRegistrationsList: IEnrollCourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.introLessonForm = new FormGroup({
         'name': new FormControl('Python', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.introLessonsList = data['introLessons'].data;
         this.introLessonsRegistrationsList = data['introLessonsRegistrations'].data;
      });
   }

   createIntroLLesson() {
      if (this.introLessonForm.invalid) {
         return;
      }

      this._apiService.createIntroLesson(this.introLessonForm.value)
         .subscribe((res) => {
            this.getIntroLessonsList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi `);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getIntroLessonsList() {
      this._apiService.getIntroLessonsList()
         .subscribe(res => {
            this.introLessonsList = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteIntroLesson(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteIntroLesson(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getIntroLessonsList();
            });
      }
   }

   deleteRegistration(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteIntroLessonRegistration(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this._apiService.getIntroLessonsRegistrations().subscribe(res => {
                  this.introLessonsRegistrationsList = res.data;
               });
            });
      }
   }
}
