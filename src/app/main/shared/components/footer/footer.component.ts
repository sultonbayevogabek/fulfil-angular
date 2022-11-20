import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { ICourse, IIntroLesson } from '../../../../shared/models/models';
import { CommunicateService } from '../../services/communicate.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit, OnDestroy {
   private _courseSubscription: Subscription;

   introLessons: IIntroLesson[] = [];
   courses: ICourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _communicateService: CommunicateService
   ) {
   }

   ngOnInit() {
      this._apiService.getIntroLessonsList()
         .subscribe(res => {
            this.introLessons = res.data;
         });
      this._courseSubscription = this._communicateService.coursesEmitter
         .subscribe(data => {
            this.courses = data;
         });
   }


   ngOnDestroy() {
      this._courseSubscription.unsubscribe();
   }
}
