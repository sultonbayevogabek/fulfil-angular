import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../common/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IRecordedIntroLesson } from '../../../common/models/models';

@Component({
   selector: 'app-admin-mentors',
   templateUrl: './recorded-intro-lessons.component.html',
   styleUrls: ['../../admin.component.scss']
})

export class RecordedIntroLessonsComponent implements OnInit {
   host = environment.host;
   recordedIntroLessonForm: FormGroup;
   recordedIntroLessons: IRecordedIntroLesson[] = [];
   pages = 0;
   page = 1;

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.recordedIntroLessonForm = new FormGroup({
         'name': new FormControl('Asadbek Zoirov', Validators.required),
         'posterImage': new FormControl(null, Validators.required),
         'teacherImage': new FormControl(null, Validators.required),
         'videoTitle': new FormControl('NodeJS. Kirish darsi. 11-noyabr, 2022', Validators.required),
         'youtube': new FormControl('raYCjkSMaP0', Validators.required),
         'themes': new FormArray([
            new FormControl('Tanishuv', Validators.required),
            new FormControl('NodeJS nima?', Validators.required),
            new FormControl('Kursda qanday loyihalar bajaramiz?', Validators.required),
            new FormControl('Kursni tugatgach, ishga kira olamanmi?', Validators.required),
            new FormControl('Dars vaqtlari', Validators.required),
            new FormControl('Savollar', Validators.required)
         ]),
         'duration': new FormControl('3 soat 22 minut', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.recordedIntroLessons = data['recordedIntroLessons'].data;
         this.pages = data['recordedIntroLessons'].allPages;
      });
   }

   createRecordedIntroLesson() {
      if (this.recordedIntroLessonForm.invalid) {
         return;
      }

      const {
         name,
         posterImage,
         teacherImage,
         videoTitle,
         youtube,
         themes,
         duration
      } = this.recordedIntroLessonForm.value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('posterImage', posterImage);
      formData.append('teacherImage', teacherImage);
      formData.append('videoTitle', videoTitle);
      formData.append('youtube', youtube);
      formData.append('duration', duration);
      themes.forEach(theme => {
         formData.append('themes', theme);
      });

      this._apiService.createRecordedIntroLesson(formData)
         .subscribe(() => {
            this.getRecorderIntroLessonsList(this.page);
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getRecorderIntroLessonsList(page: number = 1) {
      this._apiService.getRecordedIntroLessons()
         .subscribe(res => {
            this.recordedIntroLessons = res.data;
            this.pages = res.allPages;
         }, () => {
            this._toasterService.error();
         });
   }

   deleteRecordedIntroLesson(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteRecordedIntroLesson(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getRecorderIntroLessonsList(this.page);
            });
      }
   }

   addInfo() {
      (this.recordedIntroLessonForm.controls['themes'] as FormArray).push(new FormControl(null, Validators.required));
   }

   removeInfo(i: number) {
      (this.recordedIntroLessonForm.controls['themes'] as FormArray).controls.splice(i, 1);
      this.recordedIntroLessonForm.controls['themes'].updateValueAndValidity();
   }

   onImageSelected(event: Event, control: string) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         if (control === 'posterImage') {
            this.recordedIntroLessonForm.patchValue({
               'posterImage': files[0]
            });
            return;
         }
         this.recordedIntroLessonForm.patchValue({
            'teacherImage': files[0]
         });
      }
   }

   pageChange(page: number) {
      this.page = page;
      this._apiService.getRecordedIntroLessons(page)
         .subscribe(res => {
            this.recordedIntroLessons = res.data;
            this.pages = res.allPages;
         })
   }
}
