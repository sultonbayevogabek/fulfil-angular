import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../shared/services/api.service'
import { AuthService } from '../shared/services/auth.service'
import { Router } from '@angular/router'

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
   loginForm: FormGroup
   error = false
   pending = false

   constructor(
      private _adminApiService: ApiService,
      private _authService: AuthService,
      private _router: Router
   ) {
   }

   ngOnInit() {
      this.loginForm = new FormGroup({
         email: new FormControl('test@test.com', [Validators.required, Validators.email]),
         password: new FormControl('123456', Validators.required)
      })

      this._authService.admin = null
      localStorage.clear()
   }

   onLogin(): void {
      if (this.loginForm.invalid) return

      this.pending = true
      this._adminApiService.login(this.loginForm.value)
         .subscribe(res => {
            localStorage.setItem('token', res.token)
            this._router.navigate(['admin', 'cabinet']).then()
         }, () => {
            this.error = true
            this.pending = false
         })
   }
}
