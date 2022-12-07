import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICourse } from '../../../shared/models/models';

@Component({
   selector: 'app-admin-courses',
   templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
   host = environment.host;
   courseForm: FormGroup;
   coursesList: ICourse[] = [];

   constructor(
      private _apiService: ApiService,
      private _toasterService: ToasterService,
      private _route: ActivatedRoute
   ) {
   }

   ngOnInit(): void {
      this.courseForm = new FormGroup({
         'courseName': new FormControl('Android', Validators.required),
         'courseImage': new FormControl(null, Validators.required),
         'courseSubtitle': new FormControl('Angliya', Validators.required),
         'courseTitle': new FormControl('Angliya tajribasi Asosida Android dasturlash', Validators.required),
         'courseDescription': new FormControl('Har qanday o’z mobil dasturlaringizni ishlab chiqing', Validators.required),
         'coursePageImage': new FormControl(null, Validators.required),
         'whyThisCourseTitle': new FormControl(`Nega Androidni o'rganishim kerak?`, Validators.required),
         'courseDetails': new FormArray([
            new FormControl('6 oy davomida', Validators.required),
            new FormControl('Ustoz va yordamchi mutaxassislar', Validators.required),
            new FormControl('144 soatdan iborat  72 ta darslar (zoom orqali)', Validators.required),
            new FormControl('Real loyihalardan namunalar, ko’plab ish o’rinlari', Validators.required)
         ]),
         'courseSkills': new FormArray([
            new FormControl(`7 oy davomida Java, Kotlin, Ma'lumotlar bazasi, Android
            dasturlash o'rgatiladi. Kurs Zoomda onlayn olib boriladi, har bir
            dars 2 soat atrofida olib boriladi va vazifalar doimo tekshirib ustoz
            tomonidan #feedback berilib boriladi. Vaqti vaqti bilan imtihonlar
            talab ustoz tomonidan bo'lib o'tadi`, Validators.required)
         ]),
         'listOfTopics': new FormArray([
            new FormControl(`UI design`, Validators.required),
            new FormControl(`REST API`, Validators.required),
            new FormControl(`Networking (internet bilan ishlash)`, Validators.required),
            new FormControl(`SQLite`, Validators.required),
            new FormControl(`Room`, Validators.required),
            new FormControl(`Kutubxonalar bilan ishlash`, Validators.required),
            new FormControl(`Dependency injection`, Validators.required)
         ]),
         'courseProjectsList': new FormArray([
            new FormControl(`Kichik onlayn do'kon`, Validators.required),
            new FormControl(`Puzzle o'yini`, Validators.required),
            new FormControl(`Rasmni minifikatsiya qiladigan ilova`, Validators.required),
            new FormControl(`Eslatma dasturi`, Validators.required),
            new FormControl(`News app`, Validators.required),
            new FormControl(`Weather app`, Validators.required)
         ]),
         'whyThisCourse': new FormArray([
            new FormControl(`O'zbekiston bo'ylab ko'plab ish o'rinlari`, Validators.required),
            new FormControl(`Yaxshi daromadli ish`, Validators.required),
            new FormControl(`Kelajak kasbi`, Validators.required)
         ])
      });
      this._route.data.subscribe(data => {
         this.coursesList = data['courses'].data;
      });
   }

   getCourses() {
      this._apiService.getCourses()
         .subscribe((res) => {
            this.coursesList = res.data;
         });
   }

   createCourse() {
      if (this.courseForm.invalid) {
         return;
      }

      const {
         courseName, courseImage, courseSubtitle,
         courseTitle, courseDescription, coursePageImage,
         whyThisCourseTitle, courseDetails, courseSkills,
         listOfTopics, courseProjectsList, whyThisCourse
      } = this.courseForm.value;

      const formData = new FormData();

      formData.append('courseName', courseName);
      formData.append('courseImage', courseImage);
      formData.append('coursePageImage', coursePageImage);
      formData.append('courseSubtitle', courseSubtitle);
      formData.append('courseTitle', courseTitle);
      formData.append('courseDescription', courseDescription);
      formData.append('whyThisCourseTitle', whyThisCourseTitle);

      courseDetails.forEach(item => {
         formData.append('courseDetails', item);
      });
      courseSkills.forEach(item => {
         formData.append('courseSkills', item);
      });
      listOfTopics.forEach(item => {
         formData.append('listOfTopics', item);
      });
      courseProjectsList.forEach(item => {
         formData.append('courseProjectsList', item);
      });
      whyThisCourse.forEach(item => {
         formData.append('whyThisCourse', item);
      });

      this._apiService.createCourse(formData)
         .subscribe(() => {
            this.getCourses();
            this._toasterService.success(`Kurs muvaffaqqiyatli qo'shildi`);
         }, (err: HttpErrorResponse) => {
            this._toasterService.error(err.error.errors[0]);
         });
   }

   onImageSelected(event: Event, control: string) {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (files && files.length) {
         if (control === 'courseImage') {
            this.courseForm.patchValue({
               'courseImage': files[0]
            });
            return;
         }
         this.courseForm.patchValue({
            'coursePageImage': files[0]
         });
      }
   }

   deleteCourse(id: string) {
      if (window.confirm(`Rostan ham bu o'quvchini o'chirmoqchimisiz?`)) {
         this._apiService.deleteCourse(id).subscribe(() => {
            this.getCourses();
            this._toasterService.success(`Kurs muvaffaqiyatli o'chirildi`);
         });
      }
   }

   addControl(control: string) {
      (this.courseForm.controls[control] as FormArray).push(new FormControl(null, Validators.required));
   }

   removeControl(i: number, control: string) {
      (this.courseForm.controls[control] as FormArray).controls.splice(i, 1);
      this.courseForm.controls[control].updateValueAndValidity();
   }
}
