import { NgModule } from '@angular/core'
import { MentorsComponent } from './mentors/mentors.component'
import { AboutComponent } from './about.component'
import { Router, RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { StudentsProjectsComponent } from './students-projects/students-projects.component'
import { NgForOf, NgIf } from '@angular/common'
import { EmployedStudentsComponent } from './employed-students/employed-students.component'
import { IntroLessonsComponent } from './intro-lessons/intro-lessons.component'
import { HelpToWorkComponent } from './help-to-work/help-to-work.component';

const routes: Routes = [
   {
      path: '',
      component: AboutComponent,
      children: [
         {
            path: 'mentors',
            component: MentorsComponent
         },
         {
            path: 'students-projects',
            component: StudentsProjectsComponent
         },
         {
            path: 'employed-students',
            component: EmployedStudentsComponent
         },
         {
            path: 'intro-lessons',
            component: IntroLessonsComponent
         },
         {
            path: 'help-to-work',
            component: HelpToWorkComponent
         }
      ]
   }
]

@NgModule({
   declarations: [
      AboutComponent,
      MentorsComponent,
      StudentsProjectsComponent,
      EmployedStudentsComponent,
      IntroLessonsComponent,
      HelpToWorkComponent
   ],
   imports: [
      SharedModule,
      RouterModule.forChild(routes),
      NgForOf,
      NgIf
   ],
   exports: [ RouterModule ]
})

export class AboutModule {}
