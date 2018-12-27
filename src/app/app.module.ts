import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { restangularConfigFactory } from './rest-configuration';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';
import { WeatherModule } from './weather/weather.module';
import { RestConfigurationService } from './services/rest-configuration.service';
import { AppService } from './services/app.service';
import { UtilService } from './services/util.service';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
    , BrowserAnimationsModule
    , WeatherModule
    , RestangularModule.forRoot([RestConfigurationService], restangularConfigFactory),

  ],
  providers: [
    AppService
    , RestConfigurationService
    , { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
