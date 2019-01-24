import { Injectable } from '@angular/core';
import { City, CityImpl } from 'src/app/interfaces/city.interface';
import { AbstractTypedRestService } from 'src/app/services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService extends AbstractTypedRestService<City> {

  private _url = '/assets/json/city.list.json';

  constructor(restangular: Restangular, private http: HttpClient) {
    super(restangular);
  }

  getEntityName() {
    return 'city';
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this._url);
  }

  getfindCityByName(cityName: string, country?: string): Observable<City[]> {
    const cityUri = encodeURIComponent(cityName);
    console.log('getfindCityByName ', cityName, cityUri);
    const params = {
      name: cityUri
      , country: country
    };
    return this.getRestangular()
      .one('city')
      .all('list')
      .get(params);
  }



  search(filter: { name: string } = { name: '' }, page = 1): Observable<City[]> {
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
