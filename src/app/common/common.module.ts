import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NgIf } from '@angular/common';

@NgModule({
   declarations: [
      LoaderComponent,
      PaginatorComponent
   ],
   imports: [
      NgIf
   ],
   exports: [
      LoaderComponent,
      PaginatorComponent
   ]
})

export class CommonModule {}
