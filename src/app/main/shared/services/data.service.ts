import { Injectable } from '@angular/core';
import { ICourse, IHeader } from '../../../common/models/models';

@Injectable()

export class DataService {
   courses: ICourse[] = [];
   header: IHeader;
}
