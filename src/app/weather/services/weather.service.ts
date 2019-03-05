import { Injectable } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Weather, WeatherForecast, WeatherList, Wind } from '../interfaces/weatherForecast.interface';
import { AbstractTypedRestService } from '../../services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';
import { WeatherCurrent } from '../interfaces/weatherCurrent.interface';
import { WeatherDaily } from '../interfaces/weatherDaily.interface';
import { City } from 'src/app/weather/interfaces/city.interface';

const URI_BASE = 'http://openweathermap.org';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends AbstractTypedRestService<any> {

  static getDateTime(dt: Date | number): Date {
    if (typeof dt === 'number') {
      const epoch: number = dt;
      dt = new Date(0);
      dt.setUTCSeconds(epoch);
    }
    return dt;
  }

  static isDateDiff(dt_before: number, dt_current: number): boolean {
    const date_before: Date = new Date(0);
    date_before.setUTCSeconds(dt_before);
    const date_current: Date = new Date(0);
    date_current.setUTCSeconds(dt_current);
    return date_current.getDate() > date_before.getDate();
  }

  static getWindKmHour(wind: Wind): number {
    return +wind.speed * 3.6;
  }

  static getColour(value: number, min?: number, max?: number): string {
    if (!min) {
      min = 0;
    }
    if (!max) {
      max = 100;
    }
    let colour = 'rgb(255,255,255)'
    if (value > min) {

      const stepSize: number = (value / (max - min)) * 512.0;
      let green = 255;
      let red = 0;
      if (stepSize > 255) {
        red = 255;
        green = 255 - Math.round(stepSize / 2);
      } else {
        // green = 255 - Math.round(stepSize / 2);
        red = Math.round(stepSize);
      }

      if (green < 0) {
        green = 0;
      }
      if (red > 255) {
        red = 255;
      }
      colour = 'rgb(' + red + ',' + green + ',0)';
    }
    // console.log('getColour value, min, max, stepSize, red, green, rgb', value, min, max, red, green, colour);
    return colour;
  }

  // Nombre de jours entre 2 DateTimes
  static compareDay(dt1: Date, dt2: number): number {
    // console.log('compareDay dt1 dt2', dt1.getDate(), WeatherService.getDateTime(dt2).getDate());
    return WeatherService.getDateTime(dt2).getDate() - dt1.getDate();
  }

  constructor(restangular: Restangular
    , private sanitization: DomSanitizer) {
    super(restangular);
  }
  getEntityName() {
    return 'weather';
  }

  // Récupère la météo pour une commune donnée en paramètre
  getfindWeatherForecastByCity(city: City): Observable<WeatherForecast> {
    const params = {
      city: city.id ? city.id : encodeURIComponent(city.name)
      , page: 0
      , limit: 12
    };
    if (city.country) {
      params['country'] = city.country;
    }
    console.log('getfindWeatherForecastByCity ', params);
    return this.getRestangular()
      .one('weather')
      .one('forecast')
      .get(params);
  }

  getfindWeatherDailyByCity(city: City, nbDay?: number): Observable<WeatherDaily> {
    // const cityUri = encodeURIComponent(cityName);
    const params = {
      city: city.id ? city.id : encodeURIComponent(city.name)
      , page: 0
      , limit: 10
    };
    if (city.country) {
      params['country'] = city.country;
    }
    params['cnt'] = nbDay ? nbDay + '' : '7';
    console.log('getfindWeatherDailyByCity ', params);
    return this.getRestangular()
      .one('weather')
      .one('daily')
      .get(params);
  }

  getfindWeatherByCity(city: City): Observable<WeatherCurrent> {
    const params = {
      city: city.id ? city.id : encodeURIComponent(city.name)
      , page: 0
      , limit: 10
    };
    if (city.country) {
      params['country'] = city.country;
    }
    console.log('getfindWeatherByCity ', params);
    return this.getRestangular()
      .one('weather')
      .one('current')
      .get(params);
  }

  async getWeatherIcon(weather: Weather) {
    const response: string = <string>this.getRestangular().one(this.getEntityName()).one('icon').one(weather.icon).get().toPromise();
    console.log('getWeatherIcon weather', weather, response);
    return response;
  }

  getWeatherIconUrl(weather: Weather): SafeUrl {
    const url = URI_BASE + '/img/w/' + weather.icon + '.png';
    // const url = 'url(' + URI_BASE + '/img/w/' + weather.icon + '.png' + ')';
    // console.log('getWeatherIconUrl', url, weather);
    // const url = + URI_BASE + '/img/w/' + weather.icon + '.png';
    return this.sanitization.bypassSecurityTrustUrl(url);
    // return url;
  }

  // getWeatherIconUrl(weather: Weather): SafeStyle {
  //   const url = 'url(' + URI_BASE + '/img/w/' + weather.icon + '.png' + ')';
  //   // console.log('getWeatherIconUrl', url, weather);
  //   // const url = + URI_BASE + '/img/w/' + weather.icon + '.png';
  //   // return this.utilsService.sanitizeRestUrl(this.weatherService.getRestangular().configuration.baseUrl, url);
  //   return this.sanitization.bypassSecurityTrustStyle(url);
  // }


}
