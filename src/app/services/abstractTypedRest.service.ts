import { Injectable, Inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import { UtilService } from './util.service';
import { SearchParam } from '../interfaces/searchParam';

@Injectable()
export abstract class AbstractTypedRestService<T extends any> {

  @Inject(UtilService)
  protected utilsService: UtilService;

  constructor(private restangular: Restangular) {
  }

  abstract getEntityName();

  // Retourne l'enregistrement selon son id unique
  getOne(id: number, filter?: any): Observable<Partial<T>> {
    return this.restangular.one(this.getEntityName(), id).get(filter ? filter : {});
  }

  // Retourne l'enfant demandé selon son id du parent
  getChild<E>(id: number, entityChild: string): Observable<Partial<E>> {
    return this.restangular.one(this.getEntityName(), id).one(entityChild).get();
  }

  getChildList<E>(id: number, entityChild: string, filter?: any): Observable<E[]> {
    return this.restangular.one(this.getEntityName(), id).all(entityChild).getList(filter ? filter : {});
  }

  getOneUrl(url: string, param?: SearchParam): Observable<Partial<T>> {
    return this.restangular.oneUrl(this.utilsService.sanitizeRestUrl(this.restangular.configuration.baseUrl, url, param)).get();
  }

  getListUrl(url: string, param?: SearchParam): Observable<T[]> {
    return this.restangular.oneUrl(this.utilsService.sanitizeRestUrl(this.restangular.configuration.baseUrl, url, param)).getList();
  }
  getList(): Observable<Partial<T[]>> {
    return this.getListFilter({});
  }

  getActiveList(): Observable<Partial<T[]>> {
    return this.getListFilter({ 'status': 'active' });
  }

  getListFilter(filter: any): Observable<T[]> {
    return this.restangular.all(this.getEntityName()).getList(filter ? filter : {});
  }

  create(e: T, param?: any): Observable<T> {
    return this.restangular.all(this.getEntityName()).post(e, param);
  }

  update(e: T): Observable<T> {
    return e.put({});
  }

  patch(e: T, data: any): Observable<T> {
    return (e && data) ? e.patch(data, {}) : of();
  }

  getRestangular(): Restangular {
    return this.restangular;
  }

  remove(e: T): Observable<T> {
    return e.remove();
  }
}
