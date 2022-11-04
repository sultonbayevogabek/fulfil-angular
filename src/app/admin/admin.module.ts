import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuardService } from './shared/guards/admin-guard.service';
import { AuthService } from './shared/services/auth.service';

const routes: Routes = [
   {
      path: '',
      component: AdminComponent,
      children: [
         {
            path: 'login',
            component: LoginComponent
         },
         {
            path: 'cabinet',
            loadChildren: () => import('./cabinet/cabinet.module').then(m => m.CabinetModule),
            canActivate: [AdminGuardService]
         }
      ]
   }
];

@NgModule({
   imports: [
      RouterOutlet,
      RouterModule.forChild(routes),
      NgIf,
      ReactiveFormsModule
   ],
   declarations: [
      AdminComponent,
      LoginComponent
   ],
   exports: [
      RouterModule
   ],
   providers: [
      AuthService,
      AdminGuardService
   ]
})

export class AdminModule {
}
