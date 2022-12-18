import { Component, OnInit } from '@angular/core';
import { IEmployedStudent } from '../../../common/models/models';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../common/services/api.service';

@Component({
   selector: 'app-employed-students',
   templateUrl: './employed-students.component.html',
   styleUrls: ['./employed-students.component.scss']
})

export class EmployedStudentsComponent implements OnInit {
   host = environment.host;
   employedStudentsList: IEmployedStudent[] = [];
   pages = 0;

   constructor(
      private _route: ActivatedRoute,
      private _apiService: ApiService,
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.employedStudentsList = data['employedStudents'].data;
         this.pages = data['employedStudents'].allPages;
      });
   }

   pageChange(page: number) {
      this._apiService.getEmployedStudents(page)
         .subscribe(res => {
            this.employedStudentsList = res.data;
            this.pages = res.allPages;
         })
   }
}
