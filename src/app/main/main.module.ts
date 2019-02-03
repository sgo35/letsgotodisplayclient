import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { NgxWidgetGridModule, NgxWidgetComponent } from 'ngx-widget-grid';

import { MainComponent } from './main.component';
import { WeatherModule } from '../weather/weather.module';
import { CityModule } from '../weather/city/city.module';
import { EditModule } from '../dialogs/edit/edit.module';
import { MenuModule } from '../menu/menu.module';
import { WidgetService } from '../services/widget.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , HttpClientModule
    , MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatIconModule, MatSlideToggleModule, MatDialogModule
    , EditModule
    , NgxWidgetGridModule
    , MenuModule
    , CityModule
    , WeatherModule
  ]
  , providers: [WidgetService]
  , exports: [
    MainComponent
  ],
  entryComponents: [NgxWidgetComponent]
})
export class MainModule { }
