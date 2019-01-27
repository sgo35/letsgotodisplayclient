import { Injectable } from '@angular/core';
import { City, CityImpl } from 'src/app/interfaces/city.interface';
import { AbstractTypedRestService } from 'src/app/services/abstractTypedRest.service';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Page } from 'src/app/interfaces/page.interface';

@Injectable({
  providedIn: 'root'
})
export class CityService extends AbstractTypedRestService<City> {

  // private _url = '/assets/json/city.list.json';

  constructor(restangular: Restangular, private http: HttpClient) {
    super(restangular);
  }

  getEntityName() {
    return 'city';
  }

  // getCities(): Observable<City[]> {
  //   return this.http.get<City[]>(this._url);
  // }

  getfindCityByName(cityName: string, country?: string): Observable<Page<City>> {
    const cityUri = encodeURIComponent(cityName);
    const params = { name: cityUri, country: country, page: '0', limit: '10' };
    console.log('getfindCityByName ', params);

//     return this.http.get<Page<City>>('/api/cities/search', {
//       headers: httpHeaders,
//       params: httpParams,
//       responseType: 'json'
// });
    return this.getRestangular()
    .one('cities')
    .one('search')
    .get(params);
  }



  // search(filter: { name: string } = { name: '' }, page = 0): Observable<City[]> {
  //   return this.http.get<Page<City>>(this._url)
  //     .pipe(
  //       map((response: Page<City>) => {
  //         let list: City[] = response.content as City[];
  //         list = list
  //           .map(city => new CityImpl(city.name, city.country, city.coord, city.id, city.population))
  //           // Not filtering in the server since in-memory-web-api has somewhat restricted api
  //           .filter(city => city.name.includes(filter.name));
  //         return list;
  //       })
  //     );
  // }
}
