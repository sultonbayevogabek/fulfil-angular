import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IFaq } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-admin-faq',
   templateUrl: './faq.component.html'
})

export class FaqComponent implements OnInit {
   faqForm: FormGroup;
   faqList: IFaq[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.faqForm = new FormGroup({
         'question': new FormControl('Kursga qanday yozilsam bo`ladi?', Validators.required),
         'answer': new FormControl('Admin bilan aloqaga chiqing: @Abdivaliyevich', Validators.required)
      });
      this._route.data.subscribe(data => {
         this.faqList = data['faqList'].data;
      });
   }

   createFaq() {
      if (this.faqForm.invalid) {
         return;
      }

      this._apiService.createFaq(this.faqForm.value)
         .subscribe((res) => {
            this.getFaqList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getFaqList() {
      this._apiService.getFaqList()
         .subscribe(res => {
            this.faqList = res.data;
         }, () => {
            this._toasterService.error();
         });
   }

   deleteFaq(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteFaq(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getFaqList();
            });
      }
   }
}
