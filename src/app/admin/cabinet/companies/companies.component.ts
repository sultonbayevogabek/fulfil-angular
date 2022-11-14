import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from '../../../shared/models/models';
import { environment } from '../../../../environments/environment';

@Component({
   selector: 'app-faq',
   templateUrl: './companies.component.html'
})

export class CompaniesComponent implements OnInit {
   host = environment.host;
   companyForm: FormGroup;
   companiesList: ICompany[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.companyForm = new FormGroup({
         'link': new FormControl('https://us.uz', Validators.required),
         'company-logo': new FormControl(null, Validators.required)
      });
      this._route.data.subscribe(data => {
         this.companiesList = data['companies'].data;
      });
   }

   createCompany() {
      if (this.companyForm.invalid) {
         return;
      }

      const formData = new FormData();
      formData.append('link', this.companyForm.value['link']);
      formData.append('company-logo', this.companyForm.value['company-logo']);

      this._apiService.createCompany(formData)
         .subscribe((res) => {
            this.getCompaniesList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getCompaniesList() {
      this._apiService.getCompanies()
         .subscribe((res: any) => {
            this.companiesList = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteCompany(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteCompany(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getCompaniesList();
            });
      }
   }

   onImageSelected(event: Event) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         this.companyForm.patchValue({
            'company-logo': files[0]
         });
      }
   }
}
