import { Injectable } from '@angular/core';
import { ICourse } from '../../../common/models/models';

@Injectable()

export class CoursesService {
   courses: ICourse[] = [];
}
