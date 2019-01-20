import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './services/weather.service';
import { UtilService } from '../services/util.service';
import { MatCardModule, MatButtonModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherDailyComponent } from './weather-daily/weather-daily.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';


@NgModule({
  declarations: [WeatherComponent, WeatherForecastComponent, WeatherDailyComponent, WeatherNowComponent],
  imports: [
    CommonModule, BrowserAnimationsModule
    , HttpClientModule
    , MatCardModule, MatButtonModule, MatAutocompleteModule, MatInputModule
  ]
  , exports: [
    WeatherComponent
  ]
  , providers: [
    WeatherService
    , UtilService
  ]
})
export class WeatherModule { }
