import { Component, Input, OnInit } from '@angular/core';
import { IIntroLesson } from '../../../../shared/models/models';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
   selector: 'app-enroll-form',
   templateUrl: './enroll-form.component.html',
   styleUrls: ['./enroll-form.component.scss']
})

export class EnrollFormComponent implements OnInit {
   @Input() introLessons?: IIntroLesson[] = [];
   @Input() currentCourse?: string;
   enrollForm: FormGroup;
   successModalOpen = false;
   pending = false;

   constructor(
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this.enrollForm = new FormGroup({
         'name': new FormControl('', [Validators.required, validateName]),
         'phone': new FormControl('', [Validators.required, validatePhone]),
         'course': new FormControl(this.introLessons[0]?.name, Validators.required)
      });

      if (this.currentCourse) {
         this.enrollForm.patchValue({
            'course': this.currentCourse
         });
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
            }, 4000);
         });
   }
}

export const validatePhone = (control: AbstractControl) => {
   if (control.value.toString().replace(/\D/g, '').length !== 9) {
      return { invalidPhone: true };
   }
   return null;
}

export const validateName = (control: AbstractControl) => {
   if (!control.value.trim().length) {
      return { invalidName: true };
   }
   return null;
}
