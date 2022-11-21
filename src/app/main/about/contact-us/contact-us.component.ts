import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { validateName, validatePhone } from '../../shared/components/enroll-form/enroll-form.component';

@Component({
   selector: 'app-contact-us',
   templateUrl: './contact-us.component.html',
   styleUrls: ['./contact-us.component.scss']
})

export class ContactUsComponent implements OnInit {
   successModalOpen = false;
   contactForm: FormGroup;

   @HostListener('window:keydown.esc', ['$event']) handleKeyDown() {
      this.successModalOpen = false;
   }

   constructor(
      private _apiService: ApiService
   ) {
   }

   ngOnInit() {
      this.contactForm = new FormGroup({
         name: new FormControl('Suhrob Abduaxatov', [Validators.required, validateName]),
         phone: new FormControl('999639773', [Validators.required, validatePhone]),
         message: new FormControl('Nimadirlar yozish', [Validators.required, validateName])
      });
   }

   sendContact() {
      if (this.contactForm.invalid) {
         return;
      }

      const { name, phone, message } = this.contactForm.value;

      this._apiService.sendContact({
         name: name.trim(),
         phone: +`998${phone}`,
         message: message.trim()
      })
         .subscribe(() => {
            this.successModalOpen = true;

            setTimeout(() => {
               this.successModalOpen = false;
            }, 4000);
         });
   }
}
