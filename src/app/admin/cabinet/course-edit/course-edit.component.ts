import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICourse } from '../../../shared/models/models';

@Component({
   selector: 'app-admin-edit-course',
   templateUrl: './course-edit.component.html'
})

export class CourseEditComponent implements OnInit {
   host = environment.host;
   courseForm: FormGroup;
   course: ICourse;

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute,
      private _router: Router
   ) {
   }

   ngOnInit(): void {
      this.courseForm = new FormGroup({
         'courseName': new FormControl(null, Validators.required),
         'courseImage': new FormControl(null),
         'courseSubtitle': new FormControl(null, Validators.required),
         'courseTitle': new FormControl(null, Validators.required),
         'courseDescription': new FormControl(null, Validators.required),
         'coursePageImage': new FormControl(null),
         'whyThisCourseTitle': new FormControl(null, Validators.required),
         'courseDetails': new FormArray([]),
         'courseSkills': new FormArray([]),
         'listOfTopics': new FormArray([]),
         'courseProjectsList': new FormArray([]),
         'whyThisCourse': new FormArray([])
      });
      this._route.data.subscribe(data => {
         this.course = data['course'].data;

         this.courseForm.patchValue({
            'courseName': this.course.courseName,
            'courseSubtitle': this.course.courseSubtitle,
            'courseTitle': this.course.courseTitle,
            'courseDescription': this.course.courseDescription,
            'whyThisCourseTitle': this.course.whyThisCourseTitle
         });

         this.course.courseDetails.forEach(detail => {
            (this.courseForm.controls['courseDetails'] as FormArray).push(new FormControl(detail, Validators.required));
         });

         this.course.courseSkills.forEach(skill => {
            (this.courseForm.controls['courseSkills'] as FormArray).push(new FormControl(skill, Validators.required));
         });

         this.course.listOfTopics.forEach(topic => {
            (this.courseForm.controls['listOfTopics'] as FormArray).push(new FormControl(topic, Validators.required));
         });

         this.course.courseProjectsList.forEach(project => {
            (this.courseForm.controls['courseProjectsList'] as FormArray).push(new FormControl(project, Validators.required));
         });

         this.course.whyThisCourse.forEach(item => {
            (this.courseForm.controls['whyThisCourse'] as FormArray).push(new FormControl(item, Validators.required));
         });
      });
   }

   editCourse() {
      if (this.courseForm.invalid) {
         return;
      }

      const {
         courseName, courseImage, courseSubtitle,
         courseTitle, courseDescription, coursePageImage,
         whyThisCourseTitle, courseDetails, courseSkills,
         listOfTopics, courseProjectsList, whyThisCourse
      } = this.courseForm.value;

      const formData = new FormData();

      formData.append('courseName', courseName);
      if (courseImage) {
         formData.append('courseImage', courseImage);
      }
      if (coursePageImage) {
         formData.append('coursePageImage', coursePageImage);
      }
      formData.append('courseSubtitle', courseSubtitle);
      formData.append('courseTitle', courseTitle);
      formData.append('courseDescription', courseDescription);
      formData.append('whyThisCourseTitle', whyThisCourseTitle);

      courseDetails.forEach(item => {
         formData.append('courseDetails', item);
      });
      courseSkills.forEach(item => {
         formData.append('courseSkills', item);
      });
      listOfTopics.forEach(item => {
         formData.append('listOfTopics', item);
      });
      courseProjectsList.forEach(item => {
         formData.append('courseProjectsList', item);
      });
      whyThisCourse.forEach(item => {
         formData.append('whyThisCourse', item);
      });

      this._apiService.editCourse(this.course.id, formData)
         .subscribe(() => {
            this._toasterService.success(`Kurs muvaffaqqiyatli o'zgartirildi`);
            this._router.navigate(['/admin/cabinet/courses']).then();
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0]);
         });
   }

   onImageSelected(event: Event, control: string) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         if (control === 'courseImage') {
            this.courseForm.patchValue({
               'courseImage': files[0]
            });
            return;
         }
         this.courseForm.patchValue({
            'coursePageImage': files[0]
         });
      }
   }

   addControl(control: string) {
      (this.courseForm.controls[control] as FormArray).push(new FormControl(null, Validators.required));
   }

   removeControl(i: number, control: string) {
      (this.courseForm.controls[control] as FormArray).controls.splice(i, 1);
      this.courseForm.controls[control].updateValueAndValidity();
   }
}
