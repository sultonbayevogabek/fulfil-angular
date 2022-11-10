import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';

@Component({
   selector: 'app-faq',
   templateUrl: './faq.component.html'
})

export class FaqComponent implements OnInit {
   faqForm: FormGroup;

   constructor(
      private _apiService: ApiService,
      private _toaster: ApiService
   ) {
   }

   ngOnInit(): void {
      this.faqForm = new FormGroup({
         question: new FormControl(null, Validators.required),
         answer: new FormControl(null, Validators.required)
      })
   }

   createFaq() {
      this._apiService.createFaq(this.faqForm.value)
         .subscribe(res => {
            this._toaster
         })
   }
}
