import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Home {

  private events: EventAggregator = null;

  constructor(eventAggregator, authService) {
    this.events = eventAggregator;
  }

  activate() {
    this.events.publish("app:showSidebar");
    this.events.publish("app:showMenubar");
  }

}