import { Component, OnInit } from '@angular/core'
import { IHeader } from '../../shared/models/models'
import { ApiService } from '../../shared/services/api.service'

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
   header: IHeader

   constructor(
      private _apiService: ApiService
   ) {}

   ngOnInit() {
      this._apiService.getHeader()
         .subscribe(res => {
            this.header = res
         })
   }

   details = [
      '7 oy davomida o’qish',
      'Yordamchi mutaxassislar',
      '168 soatdan iborat 87 ta darslar (zoom orqali)',
      'Real loyihalardan namunalar, ko’plab va ish o’rinlari'
   ]
}
