import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { UtilService } from '../services/util.service';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule
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
