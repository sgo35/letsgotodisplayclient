import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { UtilService } from '../services/util.service';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [WeatherComponent],
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
