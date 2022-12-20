import { Component, HostListener, OnInit } from '@angular/core';
import { IRecordedIntroLesson } from '../../../common/models/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../common/services/api.service';

@Component({
   selector: 'app-employed-students',
   templateUrl: './intro-lessons.component.html',
   styleUrls: ['./intro-lessons.component.scss']
})

export class IntroLessonsComponent implements OnInit {
   host = environment.host;
   recordedIntroLessons: IRecordedIntroLesson[] = [];
   recordedIntroLesson: IRecordedIntroLesson = null;
   pages = 0;

   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.recordedIntroLesson = null;
   }

   constructor(
      private _route: ActivatedRoute,
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.recordedIntroLessons = data['recordedIntroLessons'].data;
         this.pages = data['recordedIntroLessons'].allPages;
      });
   }

   openRecordedIntroLessonModal(lesson: IRecordedIntroLesson) {
      this.recordedIntroLesson = lesson;
   }

   pageChange(page: number) {
      this._apiService.getRecordedIntroLessons(page)
         .subscribe(res => {
            this.recordedIntroLessons = res.data;
            this.pages = res.allPages;
         })
   }
}
