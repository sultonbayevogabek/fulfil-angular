import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/services/api.service';
import { CommunicateService } from '../../services/communicate.service';
import { ICourse } from '../../../../shared/models/models';
import { environment } from '../../../../../environments/environment';

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
      private _apiService: ApiService,
      private _communicateService: CommunicateService
   ) {
   }

   ngOnInit() {
      this._apiService.getCourses().subscribe(res => {
         this.courses = res.data;

         this._communicateService.coursesEmitter.next(this.courses);
         this.coursesCount = this.courses.length;
         this.coursesCount % 2 === 0 ? this.sliceIndex = this.coursesCount / 2 : this.sliceIndex = Math.trunc(this.coursesCount / 2) + 1;
         console.log(this.coursesCount);
         console.log(this.sliceIndex);
      });
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
