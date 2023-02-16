import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
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
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import fr from '@angular/common/locales/fr';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';



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
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxPaginationModule,
    NzCarouselModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
