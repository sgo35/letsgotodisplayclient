import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from './services/weather.service';
import { City, CityImpl } from '../interfaces/city.interface';
import { Weather } from './interfaces/weatherForecast.interface';
import { WeatherModeEnum } from './interfaces/weatherMode.enum';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherDailyComponent } from './weather-daily/weather-daily.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription>;
  weatherModeEnum = WeatherModeEnum;

  city: City;
  @Input() mode: WeatherModeEnum = WeatherModeEnum.Forecast;
  // _city: City;
  // @Input() set city(city: City) {
  //   this._city = city;
  // }
  // get city(): City { return this._city; }
  @ViewChild('weatherForecast') weatherForecast: WeatherForecastComponent;
  @ViewChild('weatherDaily') weatherDaily: WeatherDailyComponent;
  @ViewChild('weatherNow') weather: WeatherNowComponent;

  // searchCityControl: FormControl = new FormControl();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.subscriptions = new Array<Subscription>();
  }

  searchWeatherByCity(mode: WeatherModeEnum, city: City, nbDay?: number) {
    // this.init();
    this.mode = mode;
    this.city = city;
    console.log('mode city', mode, city);
    switch (+mode) {
      case WeatherModeEnum.Forecast:
        console.log('weatherForecast city', mode, city, this.weatherForecast);
        if (this.weatherForecast) {
          this.weatherForecast.search(city);
        } else {
          console.error('weatherForecast not loaded', mode, city);
        }
        break;

      default:
        console.error('searchWeatherByCity not found mode city', mode, city);
        break;
    }
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
    this.searchWeatherByCity(WeatherModeEnum.Forecast, new CityImpl(this.city.name, null));
    console.log('searchWeatherByCity', this.city);
  }

  ngOnDestroy() {
    // this.reset();
    console.log('ngOnDestroy WeatherComponent');
  }

}
