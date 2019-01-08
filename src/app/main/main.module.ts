import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { WeatherModule } from '../weather/weather.module';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule
    , FormsModule, ReactiveFormsModule
    , MatExpansionModule, MatFormFieldModule, MatInputModule, MatButtonModule
    , WeatherModule
  ]
  , exports: [
    MainComponent
  ]
})
export class MainModule { }
