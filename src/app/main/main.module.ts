import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule
  , MatButtonToggleModule
  , MatSidenavModule
  , MatIconModule
  , MatSlideToggleModule
  , MatDialogModule
} from '@angular/material';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { MainComponent } from './main.component';
import { WeatherModule } from '../weather/weather.module';
import { CityModule } from '../weather/city/city.module';
import { EditModule } from '../dialogs/edit/edit.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatIconModule, MatSlideToggleModule, MatDialogModule
    , EditModule
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
