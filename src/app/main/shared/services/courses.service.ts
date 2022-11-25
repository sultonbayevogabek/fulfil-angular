import { Injectable } from '@angular/core';
import { ICourse } from '../../../shared/models/models';

@Injectable()

export class CoursesService {
   courses: ICourse[] = [];
}
