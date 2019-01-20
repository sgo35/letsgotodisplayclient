import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { Weather, WeatherForecast } from '../interfaces/weatherForecast.interface';
import { City } from 'src/app/interfaces/city.interface';

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
    this.searchByCity(this.city);
  }

  searchByCity(city: City) {
    return this.search(city.name, city.country);
  }

  search(cityName: string, countryName: string) {
    this.weather = undefined;
    this.subscriptions.push(
      this.weatherService.getfindWeatherForecastByCity(cityName, countryName).subscribe(
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
        console.log('ngOnDestroy subscription forecast', subscription);
      }
    }

    ngOnDestroy() {
      this.reset();
    }
  }


