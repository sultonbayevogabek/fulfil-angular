import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { ICourse, IIntroLesson } from '../../../../shared/models/models';
import { CoursesService } from '../../services/courses.service';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
   introLessons: IIntroLesson[] = [];
   courses: ICourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _coursesService: CoursesService
   ) {
   }

   ngOnInit() {
      this._apiService.getIntroLessonsList()
         .subscribe(res => {
            this.introLessons = res.data;
         });
      this.courses = this._coursesService.courses;
   }
}
