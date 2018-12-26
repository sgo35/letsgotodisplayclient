import { Injectable } from '@angular/core';
import { DefautService } from '../defaut.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { Weather } from './weather.interface';

const entityName = 'weather';
@Injectable({
  providedIn: 'root'
})
export class WeatherService extends DefautService {

  // Récupère la météo pour une commune donnée en paramètre
  getfindByCity(city: string, options?: HttpParamsOptions): Observable<Weather> {
    return this.getOne(entityName, city);
  }



}
