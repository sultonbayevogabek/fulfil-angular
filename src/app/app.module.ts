import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './common/interceptors/http-interceptor.service';
import { CommonModule } from './common/common.module';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      CommonModule
   ],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         useClass: HttpInterceptorService,
         multi: true
      }
   ],
   bootstrap: [AppComponent]
})

export class AppModule {
}
