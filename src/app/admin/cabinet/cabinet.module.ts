import { NgModule } from '@angular/core';
import { CabinetComponent } from './cabinet.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { FaqComponent } from './faq/faq.component';
import { NgForOf, NgIf } from '@angular/common';
import { CourseRegistrationsComponent } from './course-registrations/course-registrations.component';
import {
   CommentsResolver,
   CompaniesResolver,
   ContactsResolver, CourseRegistrationsResolver,
   FaqResolver, HomePageCommentsResolver
} from './cabinet.resolvers';
import { EmployedStudentsComponent } from './employed-students/employed-students.component';
import {
   CourseResolver, CoursesResolver,
   EmployedStudentsResolver,
   MentorsResolver,
   RecordedIntroLessonsResolver,
   StudentsProjectsResolver
} from '../../app.resolvers';
import { CompaniesComponent } from './companies/companies.component';
import { MentorsComponent } from './mentors/mentors.component';
import { StudentsProjectsComponent } from './students-projects/students-projects.component';
import { RecordedIntroLessonsComponent } from './recorded-intro-lessons/recorded-intro-lessons.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CommentComponent } from './comment/comment.component';
import { TasksComponent } from './tasks/tasks.component';
import { CommonModule } from '../../common/common.module';

const routes: Routes = [
   {
      path: '',
      component: CabinetComponent,
      children: [
         {
            path: 'header',
            component: HeaderComponent
         },
         {
            path: 'settings',
            component: SettingsComponent
         },
         {
            path: 'faq',
            component: FaqComponent,
            resolve: {
               faqList: FaqResolver
            }
         },
         {
            path: 'course-registrations',
            component: CourseRegistrationsComponent,
            // resolve: {
            //       courseRegistrations: CourseRegistrationsResolver
            // }
         },
         {
            path: 'tasks',
            component: TasksComponent
         },
         {
            path: 'employed-students',
            component: EmployedStudentsComponent,
            resolve: {
               employedStudents: EmployedStudentsResolver
            }
         },
         {
            path: 'companies',
            component: CompaniesComponent,
            resolve: {
               companies: CompaniesResolver
            }
         },
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
            path: 'recorded-intro-lessons',
            component: RecordedIntroLessonsComponent,
            resolve: {
               recordedIntroLessons: RecordedIntroLessonsResolver
            }
         },
         {
            path: 'contact',
            component: ContactComponent,
            resolve: {
               contacts: ContactsResolver
            }
         },
         {
            path: 'courses',
            component: CoursesComponent,
            resolve: {
               courses: CoursesResolver
            }
         },
         {
            path: 'edit-course/:slug',
            component: CourseEditComponent,
            resolve: {
               course: CourseResolver
            }
         },
         {
            path: 'comment',
            component: CommentComponent,
            resolve: {
               comments: CommentsResolver,
               homePageComments: HomePageCommentsResolver,
               courses: CoursesResolver
            }
         }
      ]
   }
];

@NgModule({
   declarations: [
      CabinetComponent,
      HeaderComponent,
      SettingsComponent,
      FaqComponent,
      CourseRegistrationsComponent,
      EmployedStudentsComponent,
      CompaniesComponent,
      MentorsComponent,
      StudentsProjectsComponent,
      RecordedIntroLessonsComponent,
      ContactComponent,
      CoursesComponent,
      CourseEditComponent,
      CommentComponent,
      TasksComponent
   ],
   imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      NgIf,
      NgForOf,
      FormsModule,
      CommonModule
   ],
   exports: [RouterModule],
   providers: [
      FaqResolver,
      CourseRegistrationsResolver,
      EmployedStudentsResolver,
      CompaniesResolver,
      ContactsResolver,
      CommentsResolver,
      HomePageCommentsResolver
   ]
})

export class CabinetModule {
}
