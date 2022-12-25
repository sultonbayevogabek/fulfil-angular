import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../common/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
   selector: 'app-admin-settings',
   templateUrl: './settings.component.html',
   styleUrls: ['../../admin.component.scss']
})

export class SettingsComponent implements OnInit {
   passwordForm: FormGroup;

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService
   ) {
   }

   ngOnInit(): void {
      this.passwordForm = new FormGroup({
         'currentPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
         'newPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
         'repeatPassword': new FormControl(null, [Validators.required])
      }, { validators: confirmPassword });
   }

   changePassword(): void {
      if (this.passwordForm.invalid) {
         return;
      }

      this._apiService.changePassword(this.passwordForm.value)
         .subscribe(res => {
            this._toasterService.success(`Parol muvaffaqqiyatli o'zgartirildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }
}

function confirmPassword(control: AbstractControl): { confirmationPassword: boolean } | null {
   if (control.get('newPassword').value !== control.get('repeatPassword').value) {
      return { confirmationPassword: true };
   }

   return null;
}
