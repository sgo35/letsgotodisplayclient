import { Injectable } from '@angular/core';
import { DefautService } from '../defaut.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';

const entityName = 'weather';
@Injectable({
  providedIn: 'root'
})
export class WeatherService extends DefautService {

  // Récupère la météo pour une commune
  getfindByCity(city: string, options?: HttpParamsOptions): Observable<any> {
    return this.getOne(entityName, city);
  }



}