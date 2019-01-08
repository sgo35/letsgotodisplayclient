import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { restangularConfigFactory } from './rest-configuration';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';

import { RestConfigurationService } from './services/rest-configuration.service';
import { AppService } from './services/app.service';

import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
    , BrowserAnimationsModule
    , RestangularModule.forRoot([RestConfigurationService], restangularConfigFactory)
    , HeaderModule, MainModule

  ],
  providers: [
    AppService
    , RestConfigurationService
    , { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
