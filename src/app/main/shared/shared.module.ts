import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgForOf, NgIf } from '@angular/common';
import { IntroComponent } from './components/intro/intro.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EnrollFormComponent } from './components/enroll-form/enroll-form.component';
import { RouterLinkWithHref } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      HeaderComponent,
      FooterComponent,
      IntroComponent,
      CarouselComponent,
      EnrollFormComponent
   ],
   imports: [
      NgIf,
      NgForOf,
      CarouselModule,
      RouterLinkWithHref,
      ReactiveFormsModule
   ],
   exports: [
      HeaderComponent,
      FooterComponent,
      IntroComponent,
      CarouselComponent,
      EnrollFormComponent
   ]
})

export class SharedModule {
}
