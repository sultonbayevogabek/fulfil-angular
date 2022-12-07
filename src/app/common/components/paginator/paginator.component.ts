import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
   selector: 'app-paginator',
   templateUrl: './paginator.component.html',
   styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
   @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
   @Input() total: number = 0;
   @Input() currentPage?: number;
   items: number[] = [];
   page: number = 1;

   ngOnInit() {
      this.items = Array(this.total).fill(0).map((x, i) => i);

      if (this.currentPage) {
         this.page = this.currentPage
      }
   }

   changePage(i: number) {
      this.page = i;
      this.onPageChange.emit(i);
   }
}
