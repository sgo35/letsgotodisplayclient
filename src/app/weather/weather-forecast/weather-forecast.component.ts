import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { Weather, WeatherForecast } from '../interfaces/weatherForecast.interface';
import { City } from 'src/app/interfaces/city.interface';
import { WeatherModeEnum } from '../interfaces/weatherMode.enum';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService) { }

  @Input() city: City;
  weather: WeatherForecast;
  subscriptions: Array<Subscription>;

  ngOnInit() {
    this.subscriptions = new Array<Subscription>();
    // this.search(this.city);
  }

  // ngOnChanges(event) {
  //   console.log('WeatherForecastComponent ngOnChanges', event);
  // }

  search(city: City) {
    this.weather = undefined;
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
    return this.weatherService.getDateTime(dt);
  }

  isDateDiff(dt_before: number, dt_current: number): boolean {
    return this.weatherService.isDateDiff(dt_before, dt_current);
  }

  getWeatherIconUrl(weather: Weather) {
    return this.weatherService.getWeatherIconUrl(weather);
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


