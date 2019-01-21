import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { City, CityImpl } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private _url = '/assets/json/city.list.json';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this._url);
  }

  search(filter: {name: string} = {name: ''}, page = 1): Observable<City[]> {
    return this.http.get<City[]>(this._url)
    .pipe(
      tap((response: City[]) => {
        response = response
          .map(city => new CityImpl(city.name, city.country, city.coord, city.id, city.population))
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          .filter(city => city.name.includes(filter.name));
        return response;
      })
      );
  }
}
