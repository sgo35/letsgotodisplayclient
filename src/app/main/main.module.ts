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
import { WidgetComponent } from '../widget/widget.component';
import { WidgetModule } from '../widget/widget.module';
import { WidgetDirective } from '../widget/widget.directive';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    MainComponent
    , WidgetDirective
  ],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , HttpClientModule
    , MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatIconModule, MatSlideToggleModule, MatDialogModule
    , ClipboardModule
    , EditModule
    , NgxWidgetGridModule
    , MenuModule
    , CityModule
    , WeatherModule
    , WidgetModule
  ]
  , providers: [WidgetService]
  , entryComponents: [WidgetComponent]
  , exports: [
    MainComponent
  ]
})
export class MainModule { }
