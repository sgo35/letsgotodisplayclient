import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather, ApiWeather } from './weather.interface';
import { UtilService } from '../services/util.service';

const uri_base = 'http://openweathermap.org';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  data: ApiWeather;

  constructor(private weatherService: WeatherService, private utilsService: UtilService) { }

  ngOnInit() {
    this.weatherService.getfindByCity('Rennes').subscribe(
      data => {
        console.log('data', data);
        this.data = data;
      }
    );
  }

  getDateTime(dt: Date | number): Date {
    if (typeof dt === 'number') {
      const epoch: number = dt;
      dt = new Date(0);
      dt.setUTCSeconds(epoch);
    }
    return dt;
  }
  getWeatherIcon(weather: Weather): string {
    return uri_base + '/img/w/' + weather.icon + '.png';
  }
  // getWeatherIcon(weather: Weather): Observable<string> {
  //   return this.weatherService.getWeatherIcon(weather);
  // }
  // TODO https://github.com/erikflowers/weather-icons

}
