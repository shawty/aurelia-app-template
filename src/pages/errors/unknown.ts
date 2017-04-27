import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ErrorUnknown {

  private events: EventAggregator = null;

  constructor(eventAggregator) {
    this.events = eventAggregator;
  }

  activate() {
    this.events.publish("app:hideSidebar");
  }

}