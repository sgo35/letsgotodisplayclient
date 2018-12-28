import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { Weather, ApiWeather } from './weather.interface';
import { AbstractTypedRestService } from '../services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';
import { ImagePixabay } from '../interfaces/imagePixabay.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends AbstractTypedRestService<ApiWeather> {

  constructor(restangular: Restangular) {
    super(restangular);
  }
  getEntityName() {
    return 'weather';
  }

  // Récupère la météo pour une commune donnée en paramètre
  getfindByCity(cityName: string, options?: HttpParamsOptions): Observable<ApiWeather> {
    return this.getRestangular().one(this.getEntityName()).one(cityName).get(options);
  }

  async getWeatherIcon(weather: Weather) {
    const response = <string>this.getRestangular().one(this.getEntityName()).one('icon').one(weather.icon).get().toPromise();
    console.log('getWeatherIcon weather', weather, response);
    return response;
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
