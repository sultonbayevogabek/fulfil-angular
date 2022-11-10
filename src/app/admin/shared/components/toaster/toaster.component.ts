import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-toaster',
   templateUrl: './toaster.component.html',
   styleUrls: ['./toaster.component.scss']
})

export class ToasterComponent implements OnInit, OnDestroy {
   private _openSubscription: Subscription;
   private _closeSubscription: Subscription;

   toasterShow = false;
   toasterType = 'success';
   toasterText = `O'zgarishlar muvaffaqqiyatli amalga oshirildi`;

   constructor(
      private _toasterService: ToasterService
   ) {
   }

   ngOnInit() {
      this._toasterService.openToaster.subscribe(data => {
         this.toasterShow = true;
         this.toasterType = data.toasterType;
         this.toasterText = data.toasterText;
      });

      this._toasterService.closeToaster.subscribe(() => {
         this.toasterShow = false;
      });
   }


   ngOnDestroy() {
      this._openSubscription.unsubscribe()
      this._closeSubscription.unsubscribe()
   }
}
