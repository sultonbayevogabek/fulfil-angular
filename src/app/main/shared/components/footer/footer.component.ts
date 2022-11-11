import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { IIntroLesson } from '../../../../shared/models/models';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
   introLessons: IIntroLesson[] = [];

   constructor(
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this._apiService.getIntroLessonsList()
         .subscribe(res => {
            this.introLessons = res.data;
         });
   }
}
