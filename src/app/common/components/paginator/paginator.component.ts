import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
   selector: 'app-paginator',
   templateUrl: './paginator.component.html',
   styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
   @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
   @Input() total: number = 0;
   items: number[] = [];

   ngOnInit() {
      this.items = Array(this.total).fill(0).map((x, i) => i);
   }

   changePage(i: number) {
      this.onPageChange.emit(i);
   }
}
