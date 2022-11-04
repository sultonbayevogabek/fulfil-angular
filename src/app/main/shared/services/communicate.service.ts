import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IHeader } from '../../../shared/models/models';

@Injectable({
   providedIn: 'root'
})

export class CommunicateService {
   headerEmitter: Subject<IHeader> = new Subject();

   headerEmit(header: IHeader) {
      this.headerEmitter.next(header);
   }
}
