import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../../../shared/services/api.service'

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
   form: FormGroup
   created = false

   constructor(
      private _adminApiService: ApiService
   ) {}

   ngOnInit(): void {
      this._adminApiService.getHeader()
         .subscribe(res => {
            this.form.setValue({
               phoneNumber: res.phoneNumber,
               students: res.students,
               teachers: res.teachers,
               lessons: res.lessons ?? null,
               youtube: res.youtube
            })
            this.created = true
         })
      this.form = new FormGroup({
         phoneNumber: new FormControl(null, [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12)
         ]),
         students: new FormControl(null, Validators.required),
         teachers: new FormControl(null, Validators.required),
         lessons: new FormControl(null, Validators.required),
         youtube: new FormControl(null, Validators.required)
      })
   }

   onSubmit() {
      if (this.form.invalid) return

      if (this.created) {
         this._adminApiService.updateHeader(this.form.value)
            .subscribe(_ => {
               window.alert(`O'zgarishlar muvaffaqqiyatli amalga oshirildi`)
            }, err => {
               window.alert(`Xatolik ro'y berdi :(`)
            })
      }
   }
}
