import { Component, OnInit } from '@angular/core';
import { IComment, ICompany, ICourse, IHeader } from '../../common/models/models';
import { ApiService } from '../../common/services/api.service';
import { environment } from '../../../environments/environment';
import { DataService } from '../shared/services/data.service';

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
      private _dataService: DataService,
   ) {
   }

   ngOnInit() {
      this._apiService.getCompanies()
         .subscribe(res => {
            this.companies = res.data;
         });
      this._apiService.getHomePageComments()
         .subscribe(res => {
            this.comments = res.data;
         });
      this.courses = this._dataService.courses;
      this.header = this._dataService.header;
   }
}
