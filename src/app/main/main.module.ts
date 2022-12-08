import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { SharedModule } from './shared/shared.module';
import { NgForOf, NgIf } from '@angular/common';
import { CoursesResolver, HeaderResolver } from '../app.resolvers';
import { DataService } from './shared/services/data.service';

const routes: Routes = [
   {
      path: '',
      component: MainComponent,
      children: [
         {
            path: '',
            component: HomeComponent,
         },
         {
            path: 'course',
            loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
         },
         {
            path: 'about',
            loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
         }
      ],
      resolve: {
         courses: CoursesResolver,
         header: HeaderResolver
      }
   }
];

@NgModule({
   declarations: [
      MainComponent,
      HomeComponent
   ],
   imports: [
      SharedModule,
      RouterModule.forChild(routes),
      NgIf,
      NgForOf
   ],
   providers: [
      DataService
   ]
})

export class MainModule {
}
