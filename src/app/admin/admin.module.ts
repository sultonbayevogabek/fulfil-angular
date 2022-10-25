import { NgModule } from '@angular/core'
import { AdminComponent } from './admin.component'
import { RouterModule, RouterOutlet, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { AuthService } from './shared/services/auth.service'
import { NgIf } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { AdminApiService } from './shared/services/admin-api.service'
import { HttpInterceptorService } from './shared/interceptors/http-interceptor.service'
import { CabinetComponent } from './cabinet/cabinet.component'
import { AdminGuardService } from './shared/guards/admin-guard.service'

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
            component: CabinetComponent,
            canActivate: [ AdminGuardService ]
         }
      ]
   }
]

@NgModule({
   imports: [
      RouterOutlet,
      RouterModule.forChild(routes),
      NgIf,
      HttpClientModule,
      ReactiveFormsModule
   ],
   declarations: [
      AdminComponent,
      LoginComponent,
      CabinetComponent
   ],
   exports: [
      RouterModule
   ],
   providers: [
      AdminApiService,
      AuthService,
      AdminGuardService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: HttpInterceptorService,
         multi: true
      }
   ]
})

export class AdminModule {}
