import { InjectionToken } from '@angular/core';

import { Restangular } from 'ngx-restangular';

import { environment } from '../environments/environment';
import { RestConfigurationService } from './services/rest-configuration.service';

// Configuration des services Rest engine
export function restangularConfigFactory(RestangularProvider, restConfigurationService: RestConfigurationService) {

  restConfigurationService.configureBaseData(RestangularProvider);
  restConfigurationService.configureSpecificData(RestangularProvider, environment, 'api');
}

// // Configuration des services Rest UI
// export const RESTANGULAR_UI = new InjectionToken<any>('RestangularUi');

// export function restangularUiConfigFactory(restangular: Restangular, restConfigurationService: RestConfigurationService) {

//   return restangular.withConfig((RestangularConfigurer) => {
//     restConfigurationService.configureSpecificData(RestangularConfigurer, environment, 'ui');
//   });
// }
