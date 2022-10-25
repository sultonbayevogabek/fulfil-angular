import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AdminApiService } from '../shared/services/admin-api.service'
import { AuthService } from '../shared/services/auth.service'

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
      private adminApiService: AdminApiService,
      private authService: AuthService
   ) {
   }

   ngOnInit() {
      this.loginForm = new FormGroup({
         email: new FormControl('test@test.com', [Validators.required, Validators.email]),
         password: new FormControl('123456', Validators.required)
      })

      localStorage.clear()
   }

   onLogin(): void {
      if (this.loginForm.invalid) return

      this.pending = true
      this.adminApiService.login(this.loginForm.value)
         .subscribe(res => {
            localStorage.setItem('token', res.token)
            this.authService.getCurrentUser()
         }, () => {
            this.error = true
            this.pending = false
         })
   }
}
