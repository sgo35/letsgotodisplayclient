import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { WeatherService } from './services/weather.service';
import { City, CityImpl } from '../interfaces/city.interface';
import { Weather, WeatherForecast } from './interfaces/weatherForecast.interface';
import { WeatherCurrent } from './interfaces/weatherCurrent.interface';
import { WeatherDaily } from './interfaces/weatherDaily.interface';
import { WeatherModeEnum } from './interfaces/weatherMode.enum';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

const uri_cities = '../../assets/json/city.list.json';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  @Input() city: City;
  mode: WeatherModeEnum;
  subscriptions: Array<Subscription>;

  weatherModeEnum = WeatherModeEnum;
  // cities: Array<City>;

  @ViewChild('weatherForecast') weatherForecast: WeatherForecastComponent;
  weatherCurrent: WeatherCurrent;
  weatherDaily: WeatherDaily;

  // @Input() set city(city: string) {
  //   this._city = city;
  //   this.searchWeatherByCity('forecast', city);
  // }
  // get city() { return this._city; }

  searchCityControl: FormControl = new FormControl();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.subscriptions = new Array<Subscription>();
    this.mode = undefined;
    this.city = undefined;
  }

  searchWeatherByCity(mode: WeatherModeEnum, cityName?: string, countryName?: string, nbDay?: number) {
    this.init();
    this.mode = mode;
    this.city = new CityImpl(cityName, countryName);
    console.log('mode city', this.mode, this.city);
  }

  //   searchCity(name: string){
  //     return this.cities.filter(c => c.name.toLowerCase().startsWith(name.toLowerCase()));
  // }

  // getWeatherIcon(weather: Weather): Observable<string> {
  //   return this.weatherService.getWeatherIcon(weather);
  // }
  // TODO https://github.com/erikflowers/weather-icons

  async getImageByWeather(weather: Weather) {
    let response;
    const keywords: string = weather.description.split(' ').join('+');
    this.subscriptions.push(
      await this.weatherService.getImageByKeywords(keywords).subscribe(item => response = item)
    );
    console.log('getImageByWeather weather', weather, response);
    return response && response.hits && response.hits.length > 0 ? response.hits[0].largeImageURL : '';
  }

  onSubmit() {
    this.searchWeatherByCity(WeatherModeEnum.Forecast, this.city.name);
    console.log('searchWeatherByCity', this.city);
  }

  ngOnDestroy() {
    // this.reset();
  }

}
