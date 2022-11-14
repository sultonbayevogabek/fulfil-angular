import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { SharedModule } from './shared/shared.module';
import { NgForOf, NgIf } from '@angular/common';

const routes: Routes = [
   {
      path: '',
      component: MainComponent,
      children: [
         {
            path: '',
            component: HomeComponent
         },
         {
            path: 'courses',
            loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
         },
         {
            path: 'about',
            loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
         }
      ]
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
   ]
})

export class MainModule {
}
