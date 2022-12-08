import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ICourse } from '../../../../common/models/models';
import { environment } from '../../../../../environments/environment';
import { filter } from 'rxjs';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
   host = environment.host;
   showCoursesDropdown = false;
   showAboutDropdown = false;
   bottomPanel = null;
   showMenu = false;
   courses: ICourse[] = [];
   sliceIndex: number;
   coursesCount: number;

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
      private _dataService: DataService
   ) {
      this._router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe(() => {
            this.closeMenu();
            window.scroll({
               top: 0,
               left: 0,
               behavior: 'smooth'
            });
         });
   }

   ngOnInit() {
      this.courses = this._dataService.courses;
      this.coursesCount = this.courses.length;
      this.coursesCount % 2 === 0 ? this.sliceIndex = this.coursesCount / 2 : this.sliceIndex = Math.trunc(this.coursesCount / 2) + 1;
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
         this.showMenu = false;
         this._router.navigate(['about', bottomPanel]).then();
         return;
      }

      this.showMenu = true;
   }

   closeMenu() {
      this.showMenu = false;

      const url = this._router.url;
      if (url.includes('course')) {
         this.bottomPanel = 'courses';
         return;
      }
      if (url.includes('about') && !url.includes('about/intro-lessons') && !url.includes('about/students-projects')) {
         this.bottomPanel = 'about';
         return;
      }
      if (url.includes('about/intro-lessons')) {
         this.bottomPanel = 'intro-lessons';
         return;
      }
      if (url.includes('about/students-projects')) {
         this.bottomPanel = 'students-projects';
         return;
      }

      this.bottomPanel = null;
   }
}
