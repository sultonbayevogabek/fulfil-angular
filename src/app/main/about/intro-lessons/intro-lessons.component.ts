import { Component } from '@angular/core';

@Component({
   selector: 'app-employed-students',
   templateUrl: './intro-lessons.component.html',
   styleUrls: ['./intro-lessons.component.scss']
})

export class IntroLessonsComponent {
   introLessons = [
      {
         id: 1,
         name: `Og'abek Sultonbayev`,
         text: 'Lorem Ipsum is simply dummy text of the ',
         duration: '5 soat 30 minut'
      },
      {
         id: 2,
         name: `Og'abek Sultonbayev`,
         text: 'Lorem Ipsum is simply dummy text of the ',
         duration: '5 soat 30 minut'
      },
      {
         id: 3,
         name: `Og'abek Sultonbayev`,
         text: 'Lorem Ipsum is simply dummy text of the ',
         duration: '5 soat 30 minut'
      },
      {
         id: 4,
         name: `Og'abek Sultonbayev`,
         text: 'Lorem Ipsum is simply dummy text of the ',
         duration: '5 soat 30 minut'
      },
      {
         id: 5,
         name: `Og'abek Sultonbayev`,
         text: 'Lorem Ipsum is simply dummy text of the ',
         duration: '5 soat 30 minut'
      },
      {
         id: 6,
         name: `Og'abek Sultonbayev`,
         text: 'Lorem Ipsum is simply dummy text of the ',
         duration: '5 soat 30 minut'
      }
   ];
}
