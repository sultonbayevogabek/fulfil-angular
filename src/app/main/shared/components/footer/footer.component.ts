import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../../common/models/models';
import { DataService } from '../../services/data.service';

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
   courses: ICourse[] = [];

   constructor(
      private _dataService: DataService
   ) {
   }

   ngOnInit() {
      this.courses = this._dataService.courses;
   }
}
