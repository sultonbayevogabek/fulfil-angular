import { NgModule } from '@angular/core'
import { CabinetComponent } from './cabinet.component'
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
   {
      path: '',
      component: CabinetComponent,
      children: [
         {
            path: 'header',
            component: HeaderComponent
         }
      ]
   }
]

@NgModule({
   declarations: [
      CabinetComponent,
      HeaderComponent
   ],
   imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule
   ],
   exports: [RouterModule]
})

export class CabinetModule {

}
