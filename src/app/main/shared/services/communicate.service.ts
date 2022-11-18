import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICourse, IHeader } from '../../../shared/models/models';

@Injectable({
   providedIn: 'root'
})

export class CommunicateService {
   headerEmitter: Subject<IHeader> = new Subject();
   coursesEmitter: Subject<ICourse[]> = new Subject();
}
