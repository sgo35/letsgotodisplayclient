import { Component, OnInit, ViewChild } from '@angular/core';

import { WeatherComponent } from '../weather/weather.component';
import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';
import { City } from '../interfaces/city.interface';
import { Rectangle } from 'ngx-widget-grid';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  modeSelected: WeatherModeEnum;
  weatherModeEnum = WeatherModeEnum;
  weatherMode: WeatherModeEnum = WeatherModeEnum.Forecast;
  // sidenavOpen: boolean;
  rectangleDefault: Rectangle = new Rectangle({ top: 2, left: 2, height: 1, width: 1 });
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;

  constructor() {
  }

  ngOnInit() {
  }


  onWidgetChange(event) {
    console.log('onWidgetChange', event);
  }
  onModeWeatherChange(event: WeatherModeEnum) {
    this.modeSelected = event;
    console.log('onModeWeatherChange mode', event);
  }

  changeWeatherMode(event) {
    this.weatherMode = event;
  }

  changeCity(event: City) {
    if (this.weatherComponent) {
      this.searchWeather(this.weatherMode, event);
    } else {
      console.error('changeCity weatherComponent not loaded', event);
    }
  }

  searchWeather(mode: WeatherModeEnum, _city: City) {
    console.log('searchWeather mode', mode, _city);
    this.weatherComponent.searchWeatherByCity(mode, _city);
  }

}
