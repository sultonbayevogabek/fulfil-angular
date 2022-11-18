import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { IContact } from '../../../shared/models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-admin-contacts',
   templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
   contacts: IContact[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this._route.data.subscribe(data => {
         this.contacts = data['contacts'].data;
      });
   }

   getContacts() {
      this._apiService.getContacts()
         .subscribe(res => {
            this.contacts = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteContact(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteContact(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getContacts();
            });
      }
   }
}
