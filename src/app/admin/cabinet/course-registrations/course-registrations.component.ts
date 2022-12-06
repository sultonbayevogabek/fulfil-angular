import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { IEnrollCourse } from '../../shared/models/models';

@Component({
   selector: 'app-admin-course-registrations',
   templateUrl: './course-registrations.component.html'
})

export class CourseRegistrationsComponent implements OnInit {
   courseRegistrationsList: IEnrollCourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this._route.data.subscribe(data => {
         this.courseRegistrationsList = data['courseRegistrations'].data;
      });
   }

   deleteRegistration(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteCourseRegistration(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this._apiService.getCourseRegistrations().subscribe(res => {
                  this.courseRegistrationsList = res.data;
               });
            });
      }
   }
}