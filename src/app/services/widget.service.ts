import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Config, Param } from '../interfaces/ComponentConfig.class';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  // https://medium.com/@enriqueoriol/angular-service-component-communication-4933782af52c
  private configSource = new BehaviorSubject<Array<Param>>([]);
  public params$ = this.configSource.asObservable();


  constructor(private http: HttpClient) {
  }

  load(): Observable<any> {
    return this.http.get('/assets/json/widget.json');
  }

  initParams(params?: Param[]) {
    console.log('initParams', params);
    this.configSource.next(params);
  }

}
