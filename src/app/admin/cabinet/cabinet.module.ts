import { NgModule } from '@angular/core';
import { CabinetComponent } from './cabinet.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { FaqComponent } from './faq/faq.component';

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
            component: FaqComponent
         }
      ]
   }
];

@NgModule({
   declarations: [
      CabinetComponent,
      HeaderComponent,
      SettingsComponent,
      FaqComponent
   ],
   imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule
   ],
   exports: [RouterModule]
})

export class CabinetModule {
}
