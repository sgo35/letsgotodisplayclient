import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherDaily } from '../interfaces/weatherDaily.interface';
import { WeatherService } from '../services/weather.service';
import { City } from 'src/app/interfaces/city.interface';

@Component({
  selector: 'app-weather-daily',
  templateUrl: './weather-daily.component.html',
  styleUrls: ['./weather-daily.component.css']
})
export class WeatherDailyComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService) { }

  @Input() city: City;
  weather: WeatherDaily;
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
      this.weatherService.getfindWeatherDailyByCity(cityName, countryName).subscribe(
        data => {
          console.log('mode daily', data);
          this.weather = <WeatherDaily>data;
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
      for (const subscription of this.subscriptions) {
        subscription.unsubscribe();
        console.log('ngOnDestroy subscription daily', subscription);
      }
    }

    ngOnDestroy() {
      this.reset();
    }
  }
