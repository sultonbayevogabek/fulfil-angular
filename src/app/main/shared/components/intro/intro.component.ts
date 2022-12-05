import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateName, validatePhone } from '../enroll-form/enroll-form.component';

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

   startForm: FormGroup;
   startModalOpen = false;
   pending = false;

   ngOnInit() {
      this.startForm = new FormGroup({
         'name': new FormControl('', [Validators.required, validateName]),
         'phone': new FormControl('', [Validators.required, validatePhone]),
         'course': new FormControl('', Validators.required)
      });
   }
}
