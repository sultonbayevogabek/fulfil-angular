import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IComment } from '../../../../shared/models/models';
import { environment } from '../../../../../environments/environment';

@Component({
   selector: 'app-carousel',
   templateUrl: './carousel.component.html',
   styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent {
   host = environment.host;
   @Input('comments') comments?: IComment[] = [];

   customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      margin: 30,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
         0: {
            items: 1
         },
         400: {
            items: 1
         },
         940: {
            items: 2
         }
      },
      nav: true
   };
}
