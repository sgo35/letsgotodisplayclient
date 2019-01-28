import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { MainComponent } from './main.component';
import { WeatherModule } from '../weather/weather.module';
import { CityModule } from '../city/city.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatIconModule
    , NgxWidgetGridModule
    , CityModule
    , WeatherModule
  ]
  , exports: [
    MainComponent
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
