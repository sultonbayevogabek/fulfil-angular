import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
   selector: 'app-loader',
   templateUrl: './loader.component.html',
   styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
   show = false;

   constructor(
      private _loaderService: LoaderService
   ) {
   }

   ngOnInit() {
      this._loaderService.loader.subscribe(status => {
         this.show = status;
      });
   }
}
