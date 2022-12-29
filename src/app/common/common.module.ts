import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@NgModule({
   declarations: [
      LoaderComponent,
      PaginatorComponent
   ],
   imports: [
      NgIf,
      NgForOf,
      NgClass
   ],
   exports: [
      LoaderComponent,
      PaginatorComponent
   ]
})

export class CommonModule {}
