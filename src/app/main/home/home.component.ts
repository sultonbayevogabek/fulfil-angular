import { Component, OnInit } from '@angular/core';
import { ICompany, IHeader } from '../../shared/models/models';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
   host = environment.host;
   header: IHeader;
   companies: ICompany[] = [];

   constructor(
      private _apiService: ApiService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.header = data['header'];
         console.log(this.header);
      });
      this._apiService.getCompanies()
         .subscribe(res => {
            this.companies = res.data;
         });
   }

   details = [
      '7 oy davomida o’qish',
      'Yordamchi mutaxassislar',
      '168 soatdan iborat 87 ta darslar (zoom orqali)',
      'Real loyihalardan namunalar, ko’plab va ish o’rinlari'
   ];
}
