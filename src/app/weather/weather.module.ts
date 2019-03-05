import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './services/weather.service';
import { UtilService } from '../services/util.service';
import {
  MatCardModule, MatButtonModule, MatAutocompleteModule
  , MatInputModule, MatTableModule, MatButtonToggleModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherDailyComponent } from './weather-daily/weather-daily.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CityModule } from './city/city.module';
import { WeatherForecastTableComponent } from './weather-forecast/weather-forecast-table/weather-forecast-table.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [WeatherComponent
    , WeatherForecastComponent
    , WeatherDailyComponent
    , WeatherNowComponent, WeatherForecastTableComponent
  ]
  , imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
    , HttpClientModule
    , CityModule
    , MatCardModule, MatButtonModule, MatAutocompleteModule
    , MatInputModule, MatTableModule, MatButtonToggleModule
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
