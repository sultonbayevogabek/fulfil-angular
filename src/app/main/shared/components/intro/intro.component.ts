import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateName, validatePhoneUsername } from '../enroll-form/enroll-form.component';
import { ICourse } from '../../../../shared/models/models';
import { CoursesService } from '../../services/courses.service';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
   selector: 'app-intro',
   templateUrl: './intro.component.html',
   styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {
   @Input() introType? = 'course';
   @Input() introSubTitle;
   @Input() introBigTitle;
   @Input() introDescription;
   @Input() introCourseInfo?: string[];
   @Input() introImgUrl?: string;
   @Input() introStatistic?: { students: number, teachers: number, lessons: number };
   @Input() currentCourse?: ICourse;

   courses: ICourse[] = [];
   startForm: FormGroup;
   startModalOpen = false;
   pending = false;
   successModalOpen = false;

   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.startModalOpen = false;
   }

   constructor(
      private _coursesService: CoursesService,
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this.courses = this._coursesService.courses;

      this.startForm = new FormGroup({
         'name': new FormControl('', [Validators.required, validateName]),
         'phone': new FormControl('', [Validators.required, validatePhoneUsername]),
         'course': new FormControl('', Validators.required)
      });
   }

   onOpenStartModal() {
      this.startModalOpen = true;

      if (this.currentCourse) {
         this.startForm.patchValue({
            'course': this.currentCourse.courseName
         });
         return;
      }

      this.startForm.patchValue({
         'course': this.courses[0].courseName
      });
   }

   startFormSubmit() {
      if (this.startForm.invalid) return;

      this.pending = true;
      this._apiService.enrollCourse(this.startForm.value).subscribe(() => {
         this.startModalOpen = false;
         this.successModalOpen = true;
         this.pending = false;

         setTimeout(() => {
            this.successModalOpen = false;
         }, 4000)
      })
   }
}
