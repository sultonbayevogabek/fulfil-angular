import { NgModule } from '@angular/core';
import { MentorsComponent } from './mentors/mentors.component';
import { AboutComponent } from './about.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentsProjectsComponent } from './students-projects/students-projects.component';
import { NgForOf, NgIf } from '@angular/common';
import { EmployedStudentsComponent } from './employed-students/employed-students.component';
import { IntroLessonsComponent } from './intro-lessons/intro-lessons.component';
import { HelpToWorkComponent } from './help-to-work/help-to-work.component';
import { WhatIsFulfilComponent } from './what-is-fulfil/what-is-fulfil.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {
   EmployedStudentsResolver,
   MentorsResolver,
   RecordedIntroLessonsResolver,
   StudentsProjectsResolver
} from '../../app.resolvers';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '../../common/common.module';

const routes: Routes = [
   {
      path: '',
      component: AboutComponent,
      children: [
         {
            path: 'mentors',
            component: MentorsComponent,
            resolve: {
               mentors: MentorsResolver
            }
         },
         {
            path: 'students-projects',
            component: StudentsProjectsComponent,
            resolve: {
               studentsProjects: StudentsProjectsResolver
            }
         },
         {
            path: 'employed-students',
            component: EmployedStudentsComponent,
            resolve: {
               employedStudents: EmployedStudentsResolver
            }
         },
         {
            path: 'intro-lessons',
            component: IntroLessonsComponent,
            resolve: {
               recordedIntroLessons: RecordedIntroLessonsResolver
            }
         },
         {
            path: 'help-to-work',
            component: HelpToWorkComponent
         },
         {
            path: 'what-is-fulfil',
            component: WhatIsFulfilComponent
         },
         {
            path: 'contact-us',
            component: ContactUsComponent
         }
      ]
   }
];

@NgModule({
   declarations: [
      AboutComponent,
      MentorsComponent,
      StudentsProjectsComponent,
      EmployedStudentsComponent,
      IntroLessonsComponent,
      HelpToWorkComponent,
      WhatIsFulfilComponent,
      ContactUsComponent
   ],
   imports: [
      SharedModule,
      RouterModule.forChild(routes),
      NgForOf,
      NgIf,
      ReactiveFormsModule,
      SharedModule,
      SharedModule,
      CommonModule
   ],
   exports: [RouterModule]
})

export class AboutModule {
}
