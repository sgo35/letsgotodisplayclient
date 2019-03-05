import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule } from 'ngx-restangular';
import { restangularConfigFactory } from './rest-configuration';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import { RestConfigurationService } from './services/rest-configuration.service';
import { AppService } from './services/app.service';

import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';
import { WidgetService } from './services/widget.service';
import { WidgetComponent } from './widget/widget.component';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

// export function widgetServiceFactory(provider: WidgetService) {
//   return () => provider.load();
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
    , BrowserAnimationsModule
    , RestangularModule.forRoot([RestConfigurationService], restangularConfigFactory)
    , HeaderModule
    , MainModule
  ],
  providers: [
    AppService
    , WidgetService
    , RestConfigurationService
    , { provide: LOCALE_ID, useValue: 'fr' }
  ],
  entryComponents: [WidgetComponent],
  bootstrap: [AppComponent]
})
// , { provide: APP_INITIALIZER, useFactory: widgetServiceFactory, deps: [WidgetService], multi: true }
export class AppModule { }

