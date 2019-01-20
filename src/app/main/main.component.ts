import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WeatherComponent } from '../weather/weather.component';
import { WeatherModeEnum } from '../weather/interfaces/weatherMode.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formGroup: FormGroup;
  weatherModeEnum = WeatherModeEnum;
  @ViewChild('weatherComponent') weatherComponent: WeatherComponent;

  constructor(private fb: FormBuilder) {
  }

  searchWeather(mode: WeatherModeEnum) {
    this.weatherComponent.searchWeatherByCity(mode, this.formGroup.controls.city.value, 'fr');
  }


  ngOnInit() {
    this.formGroup =  this.fb.group({
      'city': 'Rennes'
    });
  }

}
