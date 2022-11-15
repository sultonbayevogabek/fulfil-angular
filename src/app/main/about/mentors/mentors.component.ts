import { Component, OnInit } from '@angular/core';
import { IMentor } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-mentors',
   templateUrl: './mentors.component.html',
   styleUrls: ['./mentors.component.scss']
})

export class MentorsComponent implements OnInit {
   host = environment.host;
   mentors: IMentor[] = [];

   constructor(
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this.mentors = data['mentors'].data;
      });
   }
}
