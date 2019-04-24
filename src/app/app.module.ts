import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FilterComponent } from './filter/filter.component';
import { PostComponent } from './post/post.component';
import { queryInterceptor } from './interceptors/query.interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },{
    provide: HTTP_INTERCEPTORS,
    useClass: queryInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
