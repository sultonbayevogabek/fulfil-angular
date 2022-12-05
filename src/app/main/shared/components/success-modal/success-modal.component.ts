import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
   selector: 'app-success-modal',
   templateUrl: './success-modal.component.html'
})

export class SuccessModalComponent {
   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.closeSuccessModal();
   }

   @Output() onCloseSuccessModal: EventEmitter<void> = new EventEmitter<void>();

   closeSuccessModal() {
      this.onCloseSuccessModal.emit();
   }
}
