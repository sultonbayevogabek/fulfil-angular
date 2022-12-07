import { Component, OnInit } from '@angular/core';
import { IEmployedStudent } from '../../../common/models/models';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-employed-students',
   templateUrl: './employed-students.component.html',
   styleUrls: ['./employed-students.component.scss']
})

export class EmployedStudentsComponent implements OnInit {
   host = environment.host;
   employedStudentsList: IEmployedStudent[] = [];

   constructor(
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.employedStudentsList = data['employedStudents'].data;
      });
   }
}
