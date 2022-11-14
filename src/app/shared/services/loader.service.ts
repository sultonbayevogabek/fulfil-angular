import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})

export class LoaderService {
   loader: Subject<boolean> = new Subject<boolean>();

   show() {
      this.loader.next(true);
   }

   hide() {
      this.loader.next(false);
   }
}
