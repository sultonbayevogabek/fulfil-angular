import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
   selector: 'app-paginator',
   templateUrl: './paginator.component.html',
   styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnChanges {
   @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
   @Input() pages: number = 0;
   items: number[] = [];
   page: number = 1;

   ngOnChanges() {
      this.items = Array(this.pages).fill(0).map((x, i) => i);
   }

   changePage(i: number) {
      if (i !== this.page) {
         this.page = i;
         this.onPageChange.emit(i);
      }
   }
}
