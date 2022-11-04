import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-intro',
   templateUrl: './intro.component.html',
   styleUrls: ['./intro.component.scss']
})

export class IntroComponent {
   @Input() introType? = 'course';
   @Input() introSubTitle;
   @Input() introBigTitle;
   @Input() introDescription;
   @Input() introCourseInfo?: string[];
   @Input() introImgUrl?: string;
   @Input() introStatistic?: { students: number, teachers: number, lessons: number };
}
