import { Injectable, Inject } from '@angular/core';
import { AppService } from './app.service';

@Injectable()
export class RestConfigurationService {
  doNotShowErrors: any;

  constructor(private appService: AppService) {
    this.doNotShowErrors = false;
  }

  configureSpecificData(RestangularProvider, environment: any, name: string) {

    const restUrlKey = name + 'RestUrl';

    // En dev / dev-distant, utilisation de la propriete dans le fichier d'environnement
    const url = environment.production ?
      'http://' + window.location.hostname + ':' + window.location.port + '/' + environment[restUrlKey]
      : environment[restUrlKey];

    // console.log('RestConfigurationService configureSpecificData', environment, url);

    RestangularProvider.setBaseUrl(url);
    this.appService.addSpecificDataToRestServicesCall(RestangularProvider);

  }

  configureBaseData(RestangularProvider: any) {
    // Champ contenant le self
    RestangularProvider.setRestangularFields({
      'selfLink': '_links.self.href', 'route': '_route'
    });

    const self = this;
    // Modification de la reponse
    RestangularProvider.addResponseInterceptor((data: any, operation: string, what: string, url: string) => {
      let modifiedData = data;

      // Pour les get contenant un _embedded
      if (operation === 'get' && modifiedData) {
        // Si presence de _embedded, on remonte les donnees sur l'objet principal
        modifiedData = self.ascendEmbedded(modifiedData, url);
      }

      if (operation === 'getList') {
        if (!data || (data && data._embedded)) {
          modifiedData = [];
        }

        if (data && data._embedded) {
          // Les resultats se trouvent dans des listes dont le nom est le type d'entite, encapsules dans un _embedded
          for (const entityName of Object.keys(data._embedded)) {
            for (const entity of data._embedded[entityName]) {
              modifiedData.push(entity);
            }
          }
          modifiedData.page = data.page;
          modifiedData._links = data._links;

          // Si presence de _embedded sur les donnes de la liste, on remonte les donnees sur l'objet principal
          for (let i = 0; i < modifiedData.length; i++) {
            modifiedData[i] = self.ascendEmbedded(modifiedData[i], url);
          }
        }
      }
      return modifiedData;
    });

    RestangularProvider.addErrorInterceptor((response: any) => {
      // Pas d'affichage des erreurs 404
      if (response.status !== 404 && !this.doNotShowErrors) {
        // Deconnexion
        if (response.status === 302 || response.status === 0) {
          this.doNotShowErrors = true;
          // this.matDialog.open(SaDeconnectionDialogComponent, {
          //   'width': '700px',
          //   'data': {}
          // }).afterClosed().subscribe(() => {
          //   this.doNotShowErrors = false;
          //   location.reload();
          // });
        } else {
          let defaultMessageKey = 'common.message.rest.error.default-message';
          if (response.status === 0) {
            defaultMessageKey = 'common.message.rest.error.connection';
          }
          let message = response.message;
          let error = typeof response.error !== 'object' ? response.error : undefined;
          let exception = response.exception;
          if (response.data) {
            message = response.data.message ? response.data.message : message;
            error = response.data.error && typeof response.data.error !== 'object' ? response.data.error : error;
            exception = response.data.exception ? response.data.exception : (response.data.type ? response.data.type : exception);
          }

          // this.translateService.get(defaultMessageKey, { 'status': response.status })
          //   .subscribe(defaultMessage => {
          //     this.saMessageService.displayRestErrorMessage((message && response.status !== 0) ? message : defaultMessage,
          //       response.status, response.request.url, message,
          //       error, exception);
          //   });
        }
      }
    });

  }

  private ascendEmbedded(data: any, url: string): any {
    if (data._embedded) {
      if (Object.keys(data._embedded).length > 0) {
        // S'il n'y a qu'un element dans _embedded qui est une liste avec un seul element, alors il devient l'objet principal
        if (Object.keys(data._embedded).length === 1 &&
          Array.isArray(data._embedded[Object.keys(data._embedded)[0]]) &&
          data._embedded[Object.keys(data._embedded)[0]].length === 1) {
          data = data._embedded[Object.keys(data._embedded)[0]][0];
        } else {
          // Sinon on parcourt les objets
          for (const dataEmbeddedKey of Object.keys(data._embedded)) {
            const dataEmbedded = data._embedded[dataEmbeddedKey];
            // cas des search by criteria qui incluent une liste : on supprime le niveau _embedded
            if (Array.isArray(dataEmbedded)) {
              data[dataEmbeddedKey] = dataEmbedded;
            } else {
              data[dataEmbeddedKey] = data._embedded[dataEmbeddedKey];
              // this.removeContent(dataEmbedded, url);
            }
          }
        }
      } else {
        console.warn('_embedded vide', data);
      }
      delete data._embedded;
    }
    return data;
    // return this.removeContent(data, url);
  }

  private removeContent(data: any, url: string) {
    // Si presence d'un objet content et hors requêtes batchs
    if (data.content && typeof (data.content) === 'object' && url.indexOf('/batch') === -1) {
      for (const key of Object.keys(data.content)) {
        data[key] = data.content[key];
      }
      delete data.content;
    }
    return data;
  }
}
