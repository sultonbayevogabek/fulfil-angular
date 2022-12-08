import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-main',
   template: `
      <div class="main">
         <app-header></app-header>
         <router-outlet></router-outlet>
         <app-footer></app-footer>
      </div>
   `,
   styles: [
      `.main {
         background-image: url("/assets/bg-images/bg-body.png");
         background-repeat: repeat-y;
         background-size: 100%;
      }
      `
   ]
})

export class MainComponent implements OnInit {
   constructor(
      private _dataService: DataService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit() {
      this._route.data.subscribe(data => {
         this._dataService.courses = data['courses'].data;
         this._dataService.header = data['header'];
      });
   }
}
