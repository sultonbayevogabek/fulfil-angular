import { Component } from '@angular/core';

@Component({
   selector: 'app-main',
   template: `
      <div class="main">
         <app-header></app-header>
         <router-outlet></router-outlet>
         <app-footer></app-footer>
      </div>
   `,
   styles: [
      `.main {
         background-image: url("/assets/bg-images/bg-body.png");
         background-repeat: repeat-y;
         background-size: 100%;
      }

      @media only screen and (max-width: 992px) {
         .main {
            padding-bottom: 70px;
         }
      }`
   ]
})

export class MainComponent {
}
