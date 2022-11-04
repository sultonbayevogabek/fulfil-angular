import { Component } from '@angular/core';

@Component({
   selector: 'app-course-details',
   templateUrl: './course-details.component.html',
   styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent {
   faq = [
      {
         id: 1,
         question: 'Nega Fulfil?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 2,
         question: 'Kurs ustozlari kimlar?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 3,
         question: 'O’qish uchun nima talab qilinadi?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 4,
         question: 'O’qish uchun ingliz tili kerakmi?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 5,
         question: 'O’qish vaqtini o’zimga qulay vaqtda qo’ysam bo’ladimi?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 6,
         question: 'O’qishni bitirib men ishga kira olamanmi?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 7,
         question: 'Kursda matematika kerak bo’ladimi?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 8,
         question: 'Bepul ochiq dars nima?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      },
      {
         id: 9,
         question: 'Kursga qanday ro’yxatdan o’taman?',
         answer: `Siz kursga ro’yxatdan o’tishingiz uchun +998883300666 qo’ngiroq qilishingiz mumkin yoki
            saytimiz orqali, @fulfiledu telegramiga aloqaga chiqishingiz orqali qilishingiz mumkin`,
         open: false
      }
   ];

   toggleFaq(item: { id: number, question: string, answer: string, open: boolean }) {
      if (item.open) {
         item.open = false;
         return;
      }
      this.faq.forEach(item => item.open = false);
      item.open = true;
   }
}
