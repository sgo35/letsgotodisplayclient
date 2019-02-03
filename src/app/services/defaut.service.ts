import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@angular/common/http/src/params';

const url = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class DefautService {

  constructor(private http: HttpClient) { }

  getOne(entityName: string, id?: string, options?: HttpParamsOptions): Observable<any> {
    return this.http.get(url + entityName + (id ? '/' + id : ''));
  }

}
