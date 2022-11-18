import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../../shared/models/models';

@Component({
   selector: 'app-admin-comment',
   templateUrl: './comment.component.html'
})

export class CommentComponent implements OnInit {
   commentForm: FormGroup;
   commentList: any[] = [];
   courses: ICourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.commentForm = new FormGroup({
         'courseId': new FormControl(null, Validators.required),
         'commentTitle': new FormControl(`Bu kurs hayotimni o'zgartirdi`, Validators.required),
         'name': new FormControl(`Abdullayev Abdulla`, Validators.required),
         'phone': new FormControl(`999639773`, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
         'image': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
         'commentDescription': new FormControl(`O’qishga kira olmaganim uchun, oiladagilarni oldida uyalib qoldim,
         Fulfil telegram kanalida suniy intellekt kursini ko’rib qoldim va shu kursda o’qishga niyat qildim,
         to’grisini aytsam natija bunday bo’ladi deb kutmagan edim, chunki hozirgi zamonda be’mani kurslar ko’payib ketgan,
         ustoz Biyimbetov Azizbek o’z ishi ustasi juda kreativ dasturchi ekan, xozirda ishga kirdim va haligacha ustozimdan maslahat olib turaman, ishlariga omad.`, Validators.required)
      });
      this._route.data.subscribe(data => {
         this.commentList = data['comments'].data;
         this.courses = data['courses'].data;
      });
   }

   createComment() {
      if (this.commentForm.invalid) {
         return;
      }

      const { courseId, commentTitle, name, phone, image, commentDescription } = this.commentForm.value;

      const formData = new FormData();

      formData.append('commentTitle', commentTitle);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('image', image);
      formData.append('commentDescription', commentDescription);

      this._apiService.createComment(courseId, formData)
         .subscribe((res) => {
            this.getCommentsList();
            this._toasterService.success(`Muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0].message);
         });
   }

   getCommentsList() {
      this._apiService.getComments()
         .subscribe(res => {
            this.commentList = res.data;
         }, err => {
            this._toasterService.error();
         });
   }

   deleteComment(id: string) {
      if (window.confirm(`Rostan ham o'chirmoqchimisiz?`)) {
         this._apiService.deleteComment(id)
            .subscribe(() => {
               this._toasterService.success(`Muvaffaqqiyatli o'chirildi`);
               this.getCommentsList();
            });
      }
   }
}
