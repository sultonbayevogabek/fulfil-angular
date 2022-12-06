import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { validateName, validatePhoneUsername } from '../../shared/components/enroll-form/enroll-form.component';

@Component({
   selector: 'app-contact-us',
   templateUrl: './contact-us.component.html',
   styleUrls: ['./contact-us.component.scss']
})

export class ContactUsComponent implements OnInit {
   successModalOpen = false;
   contactForm: FormGroup;
   pending = false;

   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.successModalOpen = false;
   }

   constructor(
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this.contactForm = new FormGroup({
         name: new FormControl('', [Validators.required, validateName]),
         phone: new FormControl('', [Validators.required, validatePhoneUsername]),
         message: new FormControl('', [Validators.required, validateName])
      });
   }

   sendContact() {
      if (this.contactForm.invalid) {
         return;
      }

      const { name, phone, message } = this.contactForm.value;

      this.pending = true;
      this._apiService.sendContact({
         name: name.trim(),
         phone: phone.trim(),
         message: message.trim()
      })
         .subscribe(() => {
            this.pending = false;
            this.successModalOpen = true;

            setTimeout(() => {
               this.successModalOpen = false;
            }, 4000);
         });
   }
}
