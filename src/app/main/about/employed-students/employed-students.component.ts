import { Component, OnInit } from '@angular/core';
import { IEmployedStudent } from '../../../shared/models/models';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-employed-students',
   templateUrl: './employed-students.component.html',
   styleUrls: ['./employed-students.component.scss']
})

export class EmployedStudentsComponent implements OnInit {
   host = environment.host;
   employedStudents: IEmployedStudent[] = [];

   constructor(
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this._apiService.getEmployedStudents()
         .subscribe(res => {
            this.employedStudents = res.data;
         })
   }
}
