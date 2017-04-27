import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import authConfig from './auth-config';
import { HttpClient } from 'aurelia-fetch-client';

//Configure Bluebird Promises.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-auth', (baseConfig) => { baseConfig.configure(authConfig); })
    .plugin('aurelia-validation');

  let container = aurelia.container;

  let http = new HttpClient();
  http.configure(config => {
    config
      .withBaseUrl("http://localhost:8000/")
      .withInterceptor({

        request(request) {
          return request;
        },

        requestError(request) {
          return request;
        },

        response(response) {

          // Individual codes we want to explicitly trap
          if (response.status === 0) {
            throw { name: "Http Error", message: "Communications Failiure", statusCode: 0, payload: response }
          }

          if (response.status === 401) {
            throw { name: "Http Error", message: "Not Authenticated", statusCode: 401, payload: response }
          }

          if (response.status === 403) {
            throw { name: "Http Error", message: "Forbidden", statusCode: 403, payload: response }
          }

          if (response.status === 404) {
            throw { name: "Http Error", message: "File Not Found", statusCode: 404, payload: response }
          }

          if (response.status === 500) {
            throw { name: "Http Error", message: "Internal Server Error", statusCode: 500, payload: response }
          }

          // If we get to here, then where treating the request either as a general non specific failiure, or as a successfull request

          // ANYTHING in the 4xx code group thats not handled above is a client error, throw it and let the requesting code deal with it
          if (response.status >= 400 && response.status <= 499)
          {
            throw { name: "Http Error", message: "Client Error (4xx)", statusCode: response.status, payload: response }
          }

          // ANYTHING in the 5xx code group thats not handled above is a server error, throw it and let the requesting code deal with it
          if (response.status >= 500 && response.status <= 599) {
            throw { name: "Http Error", message: "Server Error (5xx)", statusCode: response.status, payload: response }
          }

          // Otherwise just pass the response straight through, unmodified and untouched, codes less than or equal to 399 are generally success codes.
          return response;

        },

        responseError(response) {
          return response;
        }
      });
  });

  container.registerInstance(HttpClient, http);

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
