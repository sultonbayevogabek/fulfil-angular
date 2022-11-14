import { Component, HostListener, Input, OnInit } from '@angular/core';
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

   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.successModalOpen = false;
   }

   constructor(
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this.enrollForm = new FormGroup({
         'name': new FormControl('', [Validators.required, validateName]),
         'phone': new FormControl('', [Validators.required, validatePhone]),
         'course': new FormControl(this.introLessons[0].name, Validators.required)
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

      this._apiService.enrollCourse(this.enrollForm.value)
         .subscribe(() => {
            this.successModalOpen = true;

            setTimeout(() => {
               this.successModalOpen = false;
            }, 4000);
         });
   }
}

const validatePhone = (control: AbstractControl) => {
   if (control.value.toString().replace(/\D/g, '').length !== 9) {
      return { invalidPhone: true };
   }
   return null;
}

const validateName = (control: AbstractControl) => {
   if (!control.value.trim().length) {
      return { invalidName: true };
   }
   return null;
}
