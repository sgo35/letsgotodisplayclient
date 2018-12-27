import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service de gestion de l'application
 */
@Injectable()
export class AppService {

  // Indique que le menu de synthese a ate actionne
  private sideNav: Subject<boolean>;

  constructor() {
    this.sideNav = new Subject<boolean>();
  }

  get sideNavToggled(): Subject<boolean> {
    return this.sideNav;
  }

  toggleSideNav() {
    this.sideNav.next();
  }

  closeSideNav() {
    this.sideNav.next(false);
  }

  /**
   * Ajoute des donnees specifiques aux appels de service (exemple : version rattachee a l'objet)
   * @param RestangularProvider Provider Restangular
   */
  addSpecificDataToRestServicesCall(RestangularProvider: any) {
    RestangularProvider.addFullRequestInterceptor((element: any, operation: string, path: string, url: string,
      headers: any, params: any) => {
      // console.log('addSpecificDataToRestServicesCall element, operation, path, url, headers, params'
      //   , element, operation, path, url, headers, params);
      return {
        params: params,
        headers: headers,
        element: element
      };
    });
  }
}
