import { Component } from '@angular/core';

@Component({
   selector: 'app-employed-students',
   templateUrl: './employed-students.component.html',
   styleUrls: ['./employed-students.component.scss']
})

export class EmployedStudentsComponent {
   students = [
      {
         id: 1,
         name: `Og'abek Sultonbayev`,
         job: 'Angular Developer',
         workplace: 'Unicon Soft',
         comment: false
      },
      {
         id: 2,
         name: `Og'abek Sultonbayev`,
         job: 'Angular Developer',
         workplace: 'Unicon Soft',
         comment: false
      },
      {
         id: 3,
         name: `Og'abek Sultonbayev`,
         job: 'Angular Developer',
         workplace: 'Unicon Soft',
         comment: false
      },
      {
         id: 4,
         name: `Og'abek Sultonbayev`,
         job: 'Angular Developer',
         workplace: 'Unicon Soft',
         comment: false
      },
      {
         id: 5,
         name: `Og'abek Sultonbayev`,
         job: 'Angular Developer',
         workplace: 'Unicon Soft',
         comment: false
      },
      {
         id: 6,
         name: `Og'abek Sultonbayev`,
         job: 'Angular Developer',
         workplace: 'Unicon Soft',
         comment: false
      }
   ];
}
