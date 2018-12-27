declare const require: any;

export const environment = {
  production: true,
  version: require('../../package.json').version,
  apiRestUrl: 'http//localhost:8080/api'
};
