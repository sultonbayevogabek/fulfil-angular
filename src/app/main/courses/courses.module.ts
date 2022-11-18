import { NgModule } from '@angular/core';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CourseResolver } from '../../app.resolvers';

const routes: Routes = [
   {
      path: ':id',
      component: CourseDetailsComponent,
      resolve: {
         course: CourseResolver
      }
   }
];

@NgModule({
   declarations: [
      CourseDetailsComponent
   ],
   imports: [
      SharedModule,
      RouterModule.forChild(routes),
      NgForOf
   ]
})

export class CoursesModule {
}
