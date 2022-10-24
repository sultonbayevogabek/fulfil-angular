import { NgModule } from '@angular/core'
import { MentorsComponent } from './mentors/mentors.component'
import { AboutComponent } from './about.component'
import { Router, RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { StudentsProjectsComponent } from './students-projects/students-projects.component'
import { NgForOf, NgIf } from '@angular/common'
import { EmployedStudentsComponent } from './employed-students/employed-students.component'
import { IntroLessonsComponent } from './intro-lessons/intro-lessons.component'
import { HelpToWorkComponent } from './help-to-work/help-to-work.component'
import { WhatIsFulfilComponent } from './what-is-fulfil/what-is-fulfil.component'
import { ContactUsComponent } from './contact-us/contact-us.component'

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
]

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
      NgIf
   ],
   exports: [RouterModule]
})

export class AboutModule {
}
