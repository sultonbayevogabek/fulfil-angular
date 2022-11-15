import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { IStudentProject } from '../../../shared/models/models';

@Component({
   selector: 'app-students-projects',
   templateUrl: './students-projects.component.html',
   styleUrls: ['./students-projects.component.scss']
})

export class StudentsProjectsComponent implements OnInit {
   host = environment.host;
   studentsProjects: IStudentProject[] = [];

   constructor(
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.studentsProjects = data['studentsProjects'].data;
      });
   }
}
