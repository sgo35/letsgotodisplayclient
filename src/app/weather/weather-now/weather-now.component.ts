import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/weather/interfaces/city.interface';
import { WeatherService } from '../services/weather.service';
import { WeatherCurrent } from '../interfaces/weatherCurrent.interface';

@Component({
  selector: 'app-weather-now',
  templateUrl: './weather-now.component.html',
  styleUrls: ['./weather-now.component.css']
})
export class WeatherNowComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService) { }

  @Input() city: City;
  weather: WeatherCurrent;
  subscriptions: Array<Subscription>;

  ngOnInit() {
    this.subscriptions = new Array<Subscription>();
  }

  search(city: City) {
    this.reset();
    this.subscriptions.push(
      this.weatherService.getfindWeatherByCity(city)
        .subscribe(
          data => {
            this.weather = <WeatherCurrent>data;
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

  // getWeatherIconUrl(weather: Weather) {
  //   return this.weatherService.getWeatherIconUrl(weather);
  // }

  reset() {
    this.weather = undefined;
  }

  ngOnDestroy() {
    this.reset();
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
      console.log('reset subscription current', subscription);
    }
    console.log('ngOnDestroy WeatherNowComponent');
  }
}


