import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class ToasterService {
   openToaster: Subject<{ toasterType: 'success' | 'error'; toasterText: string }> = new Subject();
   closeToaster: Subject<void> = new Subject();

   success(toasterText: string = `O'zgarishlar muvaffaqqiyatli amalga oshirildi`): void {
      this.openToaster.next({ toasterType: 'success', toasterText });

      setTimeout(() => {
         this.closeToaster.next();
      }, 2000);
   }

   error(toasterText: string = `Xatolik ro'y berdi`): void {
      this.openToaster.next({ toasterType: 'error', toasterText });

      setTimeout(() => {
         this.closeToaster.next();
      }, 2000);
   }
}
