import { Injectable } from '@angular/core';
import { DefautService } from '../defaut.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { Weather, ApiWeather } from './weather.interface';
import { AbstractTypedRestService } from '../services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
// export class WeatherService extends DefautService {
export class WeatherService extends AbstractTypedRestService<ApiWeather> {

  constructor(restangular: Restangular) {
    super(restangular);
  }
  getEntityName() {
    return 'weather';
  }

  // Récupère la météo pour une commune donnée en paramètre
  getfindByCity(city: string, options?: HttpParamsOptions): Observable<ApiWeather> {
    return this.getRestangular().one(this.getEntityName()).one(city).get(options);
  }

  getWeatherIcon(weather: Weather): Observable<string> {
    return this.getRestangular().one(this.getEntityName()).one('icon').one(weather.icon).get();
  }

}
