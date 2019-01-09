import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { WeatherService } from './services/weather.service';
import { City } from '../interfaces/city.interface';
import { Weather, WeatherForecast } from './interfaces/weatherForecast.interface';
import { WeatherCurrent } from './interfaces/weatherCurrent.interface';

const uri_base = 'http://openweathermap.org';
const uri_cities = '../../assets/json/city.list.json';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  weatherForecast: WeatherForecast;
  weatherCurrent: WeatherCurrent;
  cities: Array<City>;
  _city: string;
  subscriptions: Array<Subscription>;

  @Input() set city(city: string) {
    this._city = city;
    this.searchWeatherByCity('forecast', city);
  }
  get city() { return this._city; }

  searchCityControl: FormControl = new FormControl();

  constructor(private weatherService: WeatherService
    , private sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.subscriptions = new Array<Subscription>();
    // this.httpService.get(uri_cities).subscribe(
    //   data => {
    //     this.cities = data as City [];	 // FILL THE ARRAY WITH DATA.
    //     console.log('init cities', this.cities);
    //     // .debounceTime(400)
    //     this.searchCityControl.valueChanges
    //       .subscribe(keyword => {
    //         return this.cities
    //           ? this.cities.filter(c => c.name.toLowerCase().startsWith(keyword.toLowerCase()))
    //           : undefined
    //         }
    //       );
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log (err.message);
    //   }
    // );
    // this.city = 'Rennes';
    // this.searchWeatherByCity();
  }

  searchWeatherByCity(mode: string, cityName?: string, countryName?: string, nbDay?: string) {
    // httpParams.append('mode', mode);
    this.weatherForecast = undefined;
    this.weatherCurrent = undefined;
    switch (mode) {
      case 'forecast':
        this.subscriptions.push(
          this.weatherService.getfindWeatherForecastByCity(cityName ? cityName : this.city, countryName).subscribe(
            data => {
              console.log('mode data', mode, data);
              this.weatherForecast = <WeatherForecast>data;
            }
            , error => {
              console.error(error);
            }
          ));
        break;
      case 'daily':
        this.subscriptions.push(
          this.weatherService.getfindWeatherDailyByCity(
            cityName ? cityName : this.city
            , countryName ? countryName : 'fr'
            , nbDay ? nbDay : '10'
          ).subscribe(
            data => {
              console.log('mode data', mode, data);
              this.weatherForecast = <WeatherForecast>data;
            }
            , error => {
              console.error(error);
            }
          ));
        break;
      case 'current':
        this.subscriptions.push(
          this.weatherService.getfindWeatherByCity(
            cityName ? cityName : this.city
            , countryName ? countryName : 'fr'
          ).subscribe(
            data => {
              console.log('mode data', mode, data);
              this.weatherCurrent = <WeatherCurrent>data;
            }
            , error => {
              console.error(error);
            }
          ));
        break;
      default:
        console.error('mode not found', mode);
        break;
    }
  }

  //   searchCity(name: string){
  //     return this.cities.filter(c => c.name.toLowerCase().startsWith(name.toLowerCase()));
  // }

  isDateDiff(dt_before: number, dt_current: number): boolean {
    const date_before: Date = new Date(0);
    date_before.setUTCSeconds(dt_before);
    const date_current: Date = new Date(0);
    date_current.setUTCSeconds(dt_current);
    return date_current.getDate() > date_before.getDate();
  }

  getDateTime(dt: Date | number): Date {
    if (typeof dt === 'number') {
      const epoch: number = dt;
      dt = new Date(0);
      dt.setUTCSeconds(epoch);
    }
    return dt;
  }
  getWeatherIcon(weather: Weather): SafeStyle {
    const url = + uri_base + '/img/w/' + weather.icon + '.png';
    // return this.utilsService.sanitizeRestUrl(this.weatherService.getRestangular().configuration.baseUrl, url);
    return this.sanitization.bypassSecurityTrustStyle('url(' + uri_base + '/img/w/' + weather.icon + '.png' + ')');
  }

  // getWeatherIcon(weather: Weather): Observable<string> {
  //   return this.weatherService.getWeatherIcon(weather);
  // }
  // TODO https://github.com/erikflowers/weather-icons

  async getImageByWeather(weather: Weather) {
    let response;
    this.subscriptions.push(
      await this.weatherService.getImageByWeather(weather).subscribe(item => response = item)
    );
    console.log('getImageByWeather weather', weather, response);
    return response && response.hits && response.hits.length > 0 ? response.hits[0].largeImageURL : '';
  }

  onSubmit() {
    this.searchWeatherByCity('forecast', this.city);
    console.log('searchWeatherByCity', this.city);
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
      console.log('ngOnDestroy subscription', subscription);
    }
  }

}
