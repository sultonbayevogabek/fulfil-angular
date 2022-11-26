import { Component, OnInit } from '@angular/core';
import { IComment, ICompany, ICourse, IHeader } from '../../shared/models/models';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../shared/services/courses.service';
import { DomSanitizer } from '@angular/platform-browser';

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
   comments: IComment[] = [];

   constructor(
      private _apiService: ApiService,
      private _route: ActivatedRoute,
      private _coursesService: CoursesService,
      private _sanitizer: DomSanitizer
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
      this._apiService.getHomePageComments()
         .subscribe(res => {
            this.comments = res.data;
         });
      this.courses = this._coursesService.courses;
   }

   iframeURL(url: string) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}
