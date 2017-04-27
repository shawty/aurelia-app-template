import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { FetchConfig } from 'aurelia-auth';
import AppRouterConfig from './app.router.config';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from 'aurelia-auth';

@inject(Router, FetchConfig, AppRouterConfig, EventAggregator, AuthService)
export class App {

  // Our injected objects
  private router: Router = null;
  private appRouterConfig: AppRouterConfig = null;
  private fetchConfig: FetchConfig = null;
  private events: EventAggregator = null;
  private auth: AuthService = null;

  // Our local properties
  private showSidebar: boolean = false;
  private showMenu: boolean = true;
  private loginName: string = "";

  constructor(router, fetchConfig, appRouterConfig, eventAggregator, authService) {
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.events = eventAggregator;
    this.auth = authService;

    this.events.subscribe('app:hideSidebar', () => { this.showSidebar = false; });
    this.events.subscribe('app:showSidebar', () => { this.showSidebar = false });
    this.events.subscribe('app:hideMenubar', () => { this.showMenu = true });
    this.events.subscribe('app:showMenubar', () => { this.showMenu = true });

    this.events.subscribe('app:changeRoute', (payload) => {
      if (payload.routeName) {
        this.appRouterConfig.router.navigateToRoute(payload.routeName);
      }
    });

    this.events.subscribe('app:signUserOut', (payload) => {
      this.signUserOut();
      if(payload.reason)
      {
        setTimeout(() =>
          {
            this.events.publish('login:showMessage', { message: payload.reason });
          }, 1000);
      }
    });

    this.events.subscribe('auth:login', (payload) => {
      if (payload.authFailed) return;
      this.loginName = payload.fullName;
    });

    this.events.subscribe('auth:logout', () => {
      this.loginName = "";
    });
  }

  activate() {
    this.appRouterConfig.configure();
    this.fetchConfig.configure();
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  private toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  private toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  private handleLogoutClick() {
    this.signUserOut();
  }

  private signUserOut() {
    return this.auth.logout("#/login")
      .then((response) => {
        // we don't actually need to do anything on logout as it's all handled automatically
      })
      .catch((response) =>
        {
          this.appRouterConfig.router.navigateToRoute('unknownerror');
        });
  }

}
