import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather, WeatherForecast } from '../interfaces/weatherForecast.interface';
import { AbstractTypedRestService } from '../../services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';
import { WeatherCurrent } from '../interfaces/weatherCurrent.interface';
import { WeatherDaily } from '../interfaces/weatherDaily.interface';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { City } from 'src/app/weather/interfaces/city.interface';

const uri_base = 'http://openweathermap.org';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends AbstractTypedRestService<any> {

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

  getWeatherIconUrl(weather: Weather): SafeStyle {
    const url = + uri_base + '/img/w/' + weather.icon + '.png';
    // return this.utilsService.sanitizeRestUrl(this.weatherService.getRestangular().configuration.baseUrl, url);
    return this.sanitization.bypassSecurityTrustStyle('url(' + uri_base + '/img/w/' + weather.icon + '.png' + ')');
  }

  getDateTime(dt: Date | number): Date {
    if (typeof dt === 'number') {
      const epoch: number = dt;
      dt = new Date(0);
      dt.setUTCSeconds(epoch);
    }
    return dt;
  }

  isDateDiff(dt_before: number, dt_current: number): boolean {
    const date_before: Date = new Date(0);
    date_before.setUTCSeconds(dt_before);
    const date_current: Date = new Date(0);
    date_current.setUTCSeconds(dt_current);
    return date_current.getDate() > date_before.getDate();
  }


}
