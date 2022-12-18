import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../common/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IEmployedStudent } from '../../../common/models/models';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-admin-employed-students',
   templateUrl: './employed-students.component.html'
})

export class EmployedStudentsComponent implements OnInit {
   host = environment.host;
   employedStudentForm: FormGroup;
   employedStudentsList: IEmployedStudent[] = [];
   pages = 0;
   page = 1;

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.employedStudentForm = new FormGroup({
         'name': new FormControl('Sultonbayev Ogabek', Validators.required),
         'workplace': new FormControl('Unicon Soft MCHJ', Validators.required),
         'profession': new FormControl('Angular Developer', Validators.required),
         'image': new FormControl(null, Validators.required),
         'comment': new FormControl('Bu kursdan keyin hayotim ancha yaxshilandi...', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.employedStudentsList = data['employedStudents'].data;
         this.pages = data['employedStudents'].allPages;
      });
   }

   getEmployedStudents(page: number = 1) {
      this._apiService.getEmployedStudents(page)
         .subscribe(res => {
            this.employedStudentsList = res.data;
            this.pages = res.allPages;
         });
   }

   createEmployedStudent() {
      if (this.employedStudentForm.invalid) {
         return;
      }

      const { name, workplace, profession, image, comment } = this.employedStudentForm.value;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('workplace', workplace);
      formData.append('profession', profession);
      formData.append('comment', comment);
      formData.append('image', image);

      this._apiService.createEmployedStudent(formData)
         .subscribe(() => {
            this.getEmployedStudents(this.page);
            this._toasterService.success(`O'quvchi muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0]);
         });
   }

   onImageSelected(event: Event) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         this.employedStudentForm.patchValue({
            'image': files[0]
         });
      }
   }

   deleteEmployedStudent(id: string) {
      if (window.confirm(`Rostan ham bu o'quvchini o'chirmoqchimisiz?`)) {
         this._apiService.deleteEmployedStudent(id).subscribe(() => {
            this.getEmployedStudents(this.page);
            this._toasterService.success(`O'quvchi muvaffaqiyatli o'chirildi`);
         });
      }
   }

   pageChange(page: number) {
      this.page = page;
      this._apiService.getEmployedStudents(page)
         .subscribe(res => {
            this.employedStudentsList = res.data;
            this.pages = res.allPages;
         })
   }
}
