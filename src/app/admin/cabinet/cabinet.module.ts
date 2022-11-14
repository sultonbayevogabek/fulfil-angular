import { NgModule } from '@angular/core';
import { CabinetComponent } from './cabinet.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { FaqComponent } from './faq/faq.component';
import { NgForOf, NgIf } from '@angular/common';
import { IntroLessonsComponent } from './intro-lesson/intro-lessons.component';
import {
   CompaniesResolver,
   FaqResolver,
   IntroLessonResolver,
   IntroLessonsRegistrationsResolver
} from './cabinet.resolvers';
import { EmployedStudentsComponent } from './employed-students/employed-students.component';
import { EmployedStudentsResolver, TeachersResolver } from '../../app.resolvers';
import { CompaniesComponent } from './companies/companies.component';
import { TeachersComponent } from './teachers/teachers.component';

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
            path: 'intro-lessons',
            component: IntroLessonsComponent,
            resolve: {
               introLessons: IntroLessonResolver,
               introLessonsRegistrations: IntroLessonsRegistrationsResolver
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
            path: 'companies',
            component: CompaniesComponent,
            resolve: {
               companies: CompaniesResolver
            }
         },
         {
            path: 'teachers',
            component: TeachersComponent,
            resolve: {
               teachers: TeachersResolver
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
      IntroLessonsComponent,
      EmployedStudentsComponent,
      CompaniesComponent,
      TeachersComponent
   ],
   imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      NgIf,
      NgForOf
   ],
   exports: [RouterModule],
   providers: [
      FaqResolver,
      IntroLessonResolver,
      IntroLessonsRegistrationsResolver,
      EmployedStudentsResolver,
      CompaniesResolver
   ]
})

export class CabinetModule {
}
