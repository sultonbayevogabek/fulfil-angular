import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../common/services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from '../shared/services/toaster.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['../admin.component.scss', './login.component.scss']
})

export class LoginComponent implements OnInit {
   loginForm: FormGroup;
   pending = false;

   constructor(
      private _adminApiService: ApiService,
      private _router: Router,
      private _toasterService: ToasterService
   ) {
   }

   ngOnInit() {
      this.loginForm = new FormGroup({
         'email': new FormControl('', [Validators.required, Validators.email]),
         'password': new FormControl('', Validators.required)
      });
   }

   onLogin(): void {
      if (this.loginForm.invalid) return;

      this.pending = true;
      this._adminApiService.login(this.loginForm.value)
         .subscribe(res => {
            localStorage.setItem('token', res.token);
            this._router.navigate(['admin', 'cabinet', 'course-registrations']).then();
         }, () => {
            this.pending = false;
            this._toasterService.error(`Login yoki parol noto'g'ri`);
         });
   }
}
