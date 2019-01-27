import { Component, OnInit, ViewChild } from '@angular/core';

import { WeatherComponent } from '../weather/weather.component';
import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';
import { City, CityImpl } from '../interfaces/city.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // modeSelected: WeatherModeEnum;
  weatherModeEnum = WeatherModeEnum;
  formGroup: FormGroup;
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      'mode': WeatherModeEnum.Forecast
    });

  }

  // onModeWeatherChange(event: WeatherModeEnum) {
  //   this.modeSelected = event;
  //   console.log('onModeWeatherChange mode', event);
  // }

  changeCity(event: City) {
    if (this.weatherComponent) {
      this.searchWeather(this.formGroup.controls.mode.value, event);
    } else {
      console.error('changeCity weatherComponent not loaded', event);
    }
  }

  searchWeather(mode: WeatherModeEnum, _city: City) {
    console.log('searchWeather mode', mode, _city);
    this.weatherComponent.searchWeatherByCity(mode, _city);
  }

}
