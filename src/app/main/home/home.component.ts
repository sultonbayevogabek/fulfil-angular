import { Component, OnInit } from '@angular/core';
import { ICompany, ICourse, IHeader } from '../../shared/models/models';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../shared/services/courses.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
   host = environment.host;
   header: IHeader;
   companies: ICompany[] = [];
   courses: ICourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _route: ActivatedRoute,
      private _coursesService: CoursesService
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.header = data['header'];
      });
      this._apiService.getCompanies()
         .subscribe(res => {
            this.companies = res.data;
         });
      this.courses = this._coursesService.courses;
   }

   details = [
      '7 oy davomida o’qish',
      'Yordamchi mutaxassislar',
      '168 soatdan iborat 87 ta darslar (zoom orqali)',
      'Real loyihalardan namunalar, ko’plab va ish o’rinlari'
   ];
}
