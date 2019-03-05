import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { Weather, WeatherForecast } from '../interfaces/weatherForecast.interface';
import { City } from 'src/app/weather/interfaces/city.interface';
import { WeatherModeEnum } from '../interfaces/weatherMode.enum';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService, private _clipboardService: ClipboardService) { }

  _city: City;
  @Input() set city(_city: City) { this._city = _city; }
  get city() { return this._city; }

  weather: WeatherForecast;
  subscriptions: Array<Subscription>;

  ngOnInit() {
    this.subscriptions = new Array<Subscription>();
    // this.search(this.city);
  }

  copy(widget: WeatherForecast) {
    console.log('copy widget', widget);
    this._clipboardService.copyFromContent(JSON.stringify(widget));
  }

  // ngOnChanges(event) {
  //   console.log('WeatherForecastComponent ngOnChanges', event);
  // }

  search(city: City) {
    this.city = city;
    this.reset();
    console.log('search mode', WeatherModeEnum.Forecast, city);
    this.subscriptions.push(
      this.weatherService.getfindWeatherForecastByCity(city).subscribe(
        data => {
          console.log('mode forecast', data);
          this.weather = <WeatherForecast>data;
        }
        , error => {
          console.error(error);
        }
      ));
  }
  getDateTime(dt): Date {
    return WeatherService.getDateTime(dt);
  }

  getWeatherIconUrl(weather: Weather) {
    return this.weatherService.getWeatherIconUrl(weather);
  }

  isDateDiff(dt_before: number, dt_current: number): boolean {
    return WeatherService.isDateDiff(dt_before, dt_current);
  }

  reset() {
    this.weather = undefined;
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
      console.log('reset subscription forecast', subscription);
    }
  }

  ngOnDestroy() {
    this.reset();
    console.log('ngOnDestroy WeatherForecastComponent');
  }
}


