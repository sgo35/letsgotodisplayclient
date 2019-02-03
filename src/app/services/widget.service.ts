import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComponentConfig } from '../interfaces/ComponentConfig.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private http: HttpClient) {
  }

  load(): Observable<any> {
    return this.http.get('/assets/json/widget.json');
  }

}
