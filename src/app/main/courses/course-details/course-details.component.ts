import { Component, OnInit } from '@angular/core';
import { ICourse, IFaq } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../shared/services/api.service';

@Component({
   selector: 'app-course-details',
   templateUrl: './course-details.component.html',
   styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit {
   course: ICourse;
   faqList: IFaq[] = [];
   host = environment.host;
   topicsCount: number = 0;

   constructor(
      private _route: ActivatedRoute,
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.course = data['course'].data;
         this.topicsCount = this.course.listOfTopics.length;
      });
      this._apiService.getFaqList().subscribe(res => {
         this.faqList = res.data;
      });
   }

   toggleFaq(item: IFaq) {
      if (item.open) {
         item.open = false;
         return;
      }
      this.faqList.forEach(item => item.open = false);
      item.open = true;
   }
}
