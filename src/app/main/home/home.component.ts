import { Component, OnInit } from '@angular/core';
import { ICompany, IHeader } from '../../shared/models/models';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';

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
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this._apiService.getHeader()
         .subscribe(res => {
            this.header = res;
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
