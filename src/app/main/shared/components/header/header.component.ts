import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/services/api.service';
import { CommunicateService } from '../../services/communicate.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
   showCoursesDropdown = false;
   showAboutDropdown = false;
   bottomPanel = null;

   @HostListener('document: keydown', ['$event']) onKeyUp(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         this.showCoursesDropdown = false;
         this.showAboutDropdown = false;
      }
   }

   @HostListener('document: click', ['$event']) onClick(event: MouseEvent) {
      const targetClassList = (event.target as HTMLElement).classList;
      if (!targetClassList.contains('dropdown__header') && !targetClassList.contains('dropdown__title')
         && !targetClassList.contains('dropdown__arrow') && !targetClassList.contains('dropdown__content')) {
         this.showCoursesDropdown = false;
         this.showAboutDropdown = false;
      }
   }

   constructor(
      private _router: Router,
      private _apiService: ApiService,
      private _communicateService: CommunicateService
   ) {
   }

   toggleDropdown(courses: 'courses' | 'about') {
      if (courses === 'courses') {
         this.showCoursesDropdown = !this.showCoursesDropdown;
         this.showAboutDropdown = false;
      }
      if (courses === 'about') {
         this.showAboutDropdown = !this.showAboutDropdown;
         this.showCoursesDropdown = false;
      }
   }

   bottomPanelAction(bottomPanel: string) {
      this.bottomPanel = bottomPanel;

      if (bottomPanel === 'intro-lessons' || bottomPanel === 'students-projects') {
         this._router.navigate(['about', bottomPanel]).then();
      }
   }
}
