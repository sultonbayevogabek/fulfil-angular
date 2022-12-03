import { Component, HostListener, OnInit } from '@angular/core';
import { IRecordedIntroLesson } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-employed-students',
   templateUrl: './intro-lessons.component.html',
   styleUrls: ['./intro-lessons.component.scss']
})

export class IntroLessonsComponent implements OnInit {
   host = environment.host;
   recordedIntroLessons: IRecordedIntroLesson[] = [];
   recordedIntroLesson: IRecordedIntroLesson = null;

   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.recordedIntroLesson = null;
   }

   constructor(
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.recordedIntroLessons = data['recordedIntroLessons'].data;
      });
   }

   openRecordedIntroLessonModal(lesson: IRecordedIntroLesson) {
      this.recordedIntroLesson = lesson;
   }
}
