import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export default class HttpService {

  private httpClient: HttpClient = null;
  private events: EventAggregator = null;

  constructor(httpClient, eventAggregator) {
    this.httpClient = httpClient;
    this.events = eventAggregator;
  }

  public get(url: string) {
    return new Promise((resolve, reject) => {
      let client = this.httpClient.fetch(url);

      client
        .then(response => response.json()
          .then(requestData => {
            resolve(requestData);
          }))
        .catch(errorData => {

          if (errorData.statusCode === 401) {
            this.events.publish("app:signUserOut", { reason: "Session Timed Out" });
            return;
          }

          if (errorData.statusCode === 403) {
            this.events.publish("app:changeRoute", { routeName: "403" });
            return;
          }

          if (errorData.statusCode === 404) {
            this.events.publish("app:changeRoute", { routeName: "404" });
            return;
          }

          if (errorData.statusCode === 500) {
            this.events.publish("app:changeRoute", { routeName: "500" });
            return;
          }

          reject(errorData);
        });
    });
  }

  public post(url: string, payload: any) {
    return new Promise((resolve, reject) => {
      let client = this.httpClient.fetch(url, { method: "post", body: JSON.stringify(payload) });

      client
        .then(response => response.json()
          .then(requestData => {
            resolve(requestData);
          }))
        .catch(errorData => {

          if (errorData.statusCode === 401) {
            this.events.publish("app:signUserOut", { reason: "Session Timed Out" });
            return;
          }

          if (errorData.statusCode === 403) {
            this.events.publish("app:changeRoute", { routeName: "403" });
            return;
          }

          if (errorData.statusCode === 404) {
            this.events.publish("app:changeRoute", { routeName: "404" });
            return;
          }

          if (errorData.statusCode === 500) {
            this.events.publish("app:changeRoute", { routeName: "500" });
            return;
          }

          reject(errorData);
        });
    });
  }

}