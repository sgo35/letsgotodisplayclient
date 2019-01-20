import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather, WeatherForecast } from '../interfaces/weatherForecast.interface';
import { AbstractTypedRestService } from '../../services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';
import { ImagePixabay } from '../../interfaces/imagePixabay.interface';
import { WeatherCurrent } from '../interfaces/weatherCurrent.interface';
import { WeatherDaily } from '../interfaces/weatherDaily.interface';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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
  getfindWeatherForecastByCity(cityName: string, country?: string): Observable<WeatherForecast> {
    const cityUri = encodeURIComponent(cityName);
    console.log('getfindWeatherForecastByCity ', cityName, cityUri);
    return this.getRestangular()
      .one('weather')
      .one('forecast')
      .one(country ? country : '')
      .one(cityUri)
      .get();
  }

  getfindWeatherDailyByCity(cityName: string, country?: string, nbDay?: number): Observable<WeatherDaily> {
    const cityUri = encodeURIComponent(cityName);
    console.log('getfindWeatherForecastByCity ', cityName, cityUri);
    return this.getRestangular()
      .one('weather')
      .one('daily')
      .one(country ? country : 'FR')
      .one(cityUri)
      .one(nbDay ? nbDay + '' : '7')
      .get();
  }

  getfindWeatherByCity(cityName: string, country?: string): Observable<WeatherCurrent> {
    const cityUri = encodeURIComponent(cityName);
    console.log('getfindWeatherByCity ', cityName, cityUri);
    return this.getRestangular()
      .one('weather')
      .one('current')
      .one(country ? country : 'FR')
      .one(cityUri)
      .get();
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

  getImageByWeather(weather: Weather): Observable<ImagePixabay> {
    const keywords: string = weather.description.split(' ').join('+');
    const url = 'https://pixabay.com/api/';
    const param = {
      key: '11118448-e4c47c2a63af17d4ea5bdb42d'
      , q: encodeURIComponent(keywords)
      , image_type: 'photo'
      , pretty: true
      , per_page: 3
      , orientation: 'horizontal'
    };
    return this.getRestangular().oneUrl('Pixabay', url).get(param);

  }


}
