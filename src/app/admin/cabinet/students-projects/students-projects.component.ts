import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IStudentProject } from '../../../shared/models/models';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-admin-students-projects',
   templateUrl: './students-projects.component.html'
})

export class StudentsProjectsComponent implements OnInit {
   host = environment.host;
   studentProjectForm: FormGroup;
   studentsProjectsList: IStudentProject[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.studentProjectForm = new FormGroup({
         'projectImage': new FormControl(null, Validators.required),
         'studentImage': new FormControl(null, Validators.required),
         'projectLink': new FormControl('https://my-app.com', Validators.required),
         'name': new FormControl('Shogirdboyev Shogirdboy', Validators.required),
         'group': new FormControl('F-11 (Front End) guruh o\'quvchisi', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.studentsProjectsList = data['studentsProjects'].data;
      });
   }

   createStudentProject() {
      if (this.studentProjectForm.invalid) {
         return;
      }

      const { projectImage, studentImage, projectLink, name, group } = this.studentProjectForm.value;

      const formData = new FormData();
      formData.append('projectImage', projectImage);
      formData.append('studentImage', studentImage);
      formData.append('projectLink', projectLink);
      formData.append('name', name);
      formData.append('group', group);

      this._apiService.createStudentProject(formData)
         .subscribe((res) => {
            this.getStudentsProjectsList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getStudentsProjectsList() {
      this._apiService.getStudentsProjects()
         .subscribe((res: any) => {
            this.studentsProjectsList = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteStudentProject(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteStudentProject(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getStudentsProjectsList();
            });
      }
   }

   onImageSelected(event: Event, control: string) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         if (control === 'studentImage') {
            this.studentProjectForm.patchValue({
               'studentImage': files[0]
            });
            return;
         }
         this.studentProjectForm.patchValue({
            'projectImage': files[0]
         });
      }
   }
}
