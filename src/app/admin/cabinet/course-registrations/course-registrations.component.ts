import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../common/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { ERegistrationStatus, IRegistration } from '../../shared/models/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-admin-course-registrations',
   templateUrl: './course-registrations.component.html',
   styleUrls: ['./course-registrations.component.scss', '../../admin.component.scss']
})

export class CourseRegistrationsComponent implements OnInit {
   registrationStatuses = ERegistrationStatus;
   courseRegistrationsList: IRegistration[] = [];

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

   getCourseRegistrations() {
      this._apiService.getCourseRegistrations().subscribe(res => {
         this.courseRegistrationsList = res.data;
      });
   }

   deleteRegistration(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteCourseRegistration(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getCourseRegistrations();
            });
      }
   }

   changeStatus(event: Event, registration: IRegistration): void {
      const newStatus = (event.currentTarget as HTMLSelectElement).value;

      if (!window.confirm(`Rostan ham statusni "${ newStatus }" ga o'zgartirmoqchimisiz?`)) {
         (event.currentTarget as HTMLSelectElement).value = registration.status;
         return;
      }

      this._apiService.updateCourseRegistrationStatus(registration.id, newStatus)
         .subscribe(() => {
            this._toasterService.success(`Status ${newStatus} ga o'zgartirildi`);
            this.getCourseRegistrations();
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }
}
