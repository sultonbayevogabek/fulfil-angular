import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../../common/models/models';
import { CoursesService } from '../../services/courses.service';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
   courses: ICourse[] = [];

   constructor(
      private _coursesService: CoursesService
   ) {
   }

   ngOnInit() {
      this.courses = this._coursesService.courses;
   }
}
