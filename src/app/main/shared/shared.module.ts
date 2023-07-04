import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgForOf, NgIf } from '@angular/common';
import { IntroComponent } from './components/intro/intro.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EnrollFormComponent } from './components/enroll-form/enroll-form.component';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubePlayer } from './components/youtube-player/youtube-player.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
   declarations: [
      HeaderComponent,
      FooterComponent,
      IntroComponent,
      CarouselComponent,
      EnrollFormComponent,
      YoutubePlayer,
      SuccessModalComponent
   ],
   imports: [
      NgIf,
      NgForOf,
      CarouselModule,
      RouterLinkWithHref,
      ReactiveFormsModule,
      RouterLink,
      RouterLinkActive,
      YouTubePlayerModule,
      NgxMaskModule.forRoot()
   ],
   exports: [
      HeaderComponent,
      FooterComponent,
      IntroComponent,
      CarouselComponent,
      EnrollFormComponent,
      YoutubePlayer,
      SuccessModalComponent,
      NgxMaskModule
   ]
})

export class SharedModule {
}
