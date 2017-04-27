import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import HttpService from '../HttpService';

@inject(EventAggregator, HttpService)
export class Data {

  private events: EventAggregator = null;
  private httpService: HttpService = null;

  private id: number = 0;
  private name: string = "Not Set";
  private email: string = "Not Set";

  constructor(eventAggregator, httpService) {
    this.events = eventAggregator;
    this.httpService = httpService;
  }

  activate() {
    this.loadData();
  }

  private loadData() {
    this.httpService.get('testdata')
      .then((data: any) => {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
      })
      .catch((error) => {
        this.events.publish("app:changeRoute", { routeName: 'unknownerror' });
      });
  }

}