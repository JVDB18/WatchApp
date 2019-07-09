import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogInComponent } from './components/nav-bar/log-in/log-in.component';
import { AuthorizeComponent } from './components/nav-bar/authorize/authorize.component';
import { SharedModule } from './shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselComponent } from './landing-page/carousel/carousel.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavBarComponent,
    LogInComponent,
    AuthorizeComponent,
    SearchComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent], 
})
export class AppModule { }
