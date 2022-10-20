import { Component } from '@angular/core'

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})

export class HomeComponent {
   statistics = [
      {
         statisticTitle: 'O’quvchilar',
         statisticNumber: 700
      },
      {
         statisticTitle: 'O’qituvchilar',
         statisticNumber: 10
      },
      {
         statisticTitle: 'Darslar',
         statisticNumber: 200
      }
   ]
   details = [
      '7 oy davomida o’qish',
      'Yordamchi mutaxassislar',
      '168 soatdan iborat 87 ta darslar (zoom orqali)',
      'Real loyihalardan namunalar, ko’plab va ish o’rinlari'
   ]
}
