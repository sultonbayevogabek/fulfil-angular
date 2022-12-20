import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { IStudentProject } from '../../../common/models/models';
import { ApiService } from '../../../common/services/api.service';

@Component({
   selector: 'app-students-projects',
   templateUrl: './students-projects.component.html',
   styleUrls: ['./students-projects.component.scss']
})

export class StudentsProjectsComponent implements OnInit {
   host = environment.host;
   studentsProjects: IStudentProject[] = [];
   pages = 0;

   constructor(
      private _route: ActivatedRoute,
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.studentsProjects = data['studentsProjects'].data;
         this.pages = data['studentsProjects'].allPages;
      });
   }

   pageChange(page: number) {
      this._apiService.getStudentsProjects(page)
         .subscribe(res => {
            this.studentsProjects = res.data;
            this.pages = res.allPages;
         })
   }
}
