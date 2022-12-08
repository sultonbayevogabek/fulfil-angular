import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../common/services/api.service';
import { ICourse } from '../../../../common/models/models';
import { DataService } from '../../services/data.service';

@Component({
   selector: 'app-enroll-form',
   templateUrl: './enroll-form.component.html',
   styleUrls: ['./enroll-form.component.scss']
})

export class EnrollFormComponent implements OnInit, OnChanges {
   courses: ICourse[] = [];
   @Input() currentCourse?: ICourse;
   enrollForm: FormGroup;
   successModalOpen = false;
   pending = false;

   constructor(
      private _apiService: ApiService,
      private _dataService: DataService
   ) {
   }

   ngOnInit() {
      this.courses = this._dataService.courses;

      this.enrollForm = new FormGroup({
         'name': new FormControl('', [Validators.required, validateName]),
         'phone': new FormControl('', [Validators.required, validatePhoneUsername]),
         'course': new FormControl('', Validators.required)
      });

      if (this.courses.length) {
         this.enrollForm.patchValue({
            'course': this.courses[0].courseName
         });
      }
   }

   ngOnChanges(changes: SimpleChanges) {
      if (this.currentCourse) {
         this.enrollForm.patchValue({
            'course': this.currentCourse.courseName
         });
         return;
      }
   }

   enrollCourse() {
      if (this.enrollForm.invalid) {
         return;
      }

      this.pending = true;
      this._apiService.enrollCourse(this.enrollForm.value)
         .subscribe(() => {
            this.successModalOpen = true;
            this.pending = false;

            setTimeout(() => {
               this.successModalOpen = false;
            }, 10000);
         });
   }
}

export const validatePhoneUsername = (control: AbstractControl) => {
   if (control.value.toString().replace(/ /g, '').length < 4) {
      return {invalidPhoneUsername: true};
   }
   return null;
};

export const validateName = (control: AbstractControl) => {
   if (!control.value.trim().length) {
      return {invalidName: true};
   }
   return null;
};
