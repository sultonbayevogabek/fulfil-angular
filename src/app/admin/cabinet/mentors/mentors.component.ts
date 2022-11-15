import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IMentor } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-admin-mentors',
   templateUrl: './mentors.component.html'
})

export class MentorsComponent implements OnInit {
   host = environment.host;
   mentorForm: FormGroup;
   mentorsList: IMentor[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.mentorForm = new FormGroup({
         'name': new FormControl('Asadbek Zoirov', Validators.required),
         'position': new FormControl('Senior Backend Developer', Validators.required),
         'workplace': new FormControl('Payme LLC', Validators.required),
         'information': new FormArray([
            new FormControl('Tajribasi: 7 yil', Validators.required),
            new FormControl('Xalqaro tajriba: 4 yil', Validators.required),
            new FormControl('Malayziyada Limkokwing University of Creative Technology unversitetini IT yo\'nalishini bitirgan', Validators.required),
            new FormControl('Java Kotlin dasturlash tillari xamda Andriod studioda mukammal bilimga ega', Validators.required),
            new FormControl('Hozirda Buyuk Britaniyaning “Infinity group” kompaniyasida faoliyat ko\'rsatmoqda', Validators.required),
            new FormControl('Fulfil educationda Android dasturlash ustozi', Validators.required)
         ]),
         'teacherImage': new FormControl('null', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.mentorsList = data['mentors'].data;
      });
   }

   createTeacher() {
      if (this.mentorForm.invalid) {
         return;
      }

      const { name, position, workplace, information, teacherImage } = this.mentorForm.value;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('position', position);
      formData.append('workplace', workplace);
      information.forEach(info => {
         formData.append('information', info);
      });
      formData.append('teacherImage', teacherImage);

      this._apiService.createMentor(formData)
         .subscribe((res) => {
            this.getTeachersList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getTeachersList() {
      this._apiService.getMentors()
         .subscribe(res => {
            this.mentorsList = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteTeacher(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteMentor(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getTeachersList();
            });
      }
   }

   addInfo() {
      (this.mentorForm.controls['information'] as FormArray).push(new FormControl(null, Validators.required));
   }

   removeInfo(i: number) {
      (this.mentorForm.controls['information'] as FormArray).controls.splice(i, 1);
      this.mentorForm.controls['information'].updateValueAndValidity();
   }

   onImageSelected(event: Event) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         this.mentorForm.patchValue({
            'teacherImage': files[0]
         });
      }
   }
}
