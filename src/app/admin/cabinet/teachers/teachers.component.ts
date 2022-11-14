import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITeacher } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-faq',
   templateUrl: './teachers.component.html'
})

export class TeachersComponent implements OnInit {
   host = environment.host;
   teacherForm: FormGroup;
   teacherList: ITeacher[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.teacherForm = new FormGroup({
         'name': new FormControl('Asadbek Zoirov', Validators.required),
         'position': new FormControl('Senior Backend Developer', Validators.required),
         'workplace': new FormControl('Payme LLC', Validators.required),
         'information': new FormArray([
            new FormControl('10 yillik tajribaga ega', Validators.required)
         ]),
         'teacherImage': new FormControl('null', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.teacherList = data['teachers'].data;
      });
   }

   createTeacher() {
      if (this.teacherForm.invalid) {
         return;
      }

      const { name, position, workplace, information, teacherImage } = this.teacherForm.value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('position', position);
      formData.append('workplace', workplace);
      information.forEach(info => {
         formData.append('information', info);
      });
      formData.append('teacherImage', teacherImage);

      this._apiService.createTeacher(formData)
         .subscribe((res) => {
            this.getTeachersList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getTeachersList() {
      this._apiService.getTeachers()
         .subscribe(res => {
            this.teacherList = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteTeacher(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteTeacher(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getTeachersList();
            });
      }
   }

   addInfo() {
      (this.teacherForm.controls['information'] as FormArray).push(new FormControl(null, Validators.required));
   }

   removeInfo(i: number) {
      (this.teacherForm.controls['information'] as FormArray).controls.splice(i, 1);
      this.teacherForm.controls['information'].updateValueAndValidity();
   }

   onImageSelected(event: Event) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         this.teacherForm.patchValue({
            'teacherImage': files[0]
         });
      }
   }
}
