import { AuthorizeStep } from 'aurelia-auth';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export default class AppRouterConfig {

  public router = null;

  constructor(router) {
    this.router = router;
  }

  configure() {
    var appRouterConfig = config => {

      config.title = 'My Aurelia Application';
      config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

      config.map([
        // Actual application pages
        { route: ['', 'login'], moduleId: './pages/login', nav: false, title: 'Login', name: 'login' },
        { route: 'home', moduleId: './pages/home', nav: true, title: 'Home', auth: true, name: 'home' },
        { route: 'data', moduleId: './pages/data', nav: true, title: 'Data', auth: true, name: 'data' },

        // Error routes come last, and are marked as NOT appearing in the navigatable menu
        { route: '403', moduleId: './pages/errors/403', nav: false, title: 'Access Denied', name: '403' },
        { route: '404', moduleId: './pages/errors/404', nav: false, title: 'Page Not Found', name: '404' },
        { route: '500', moduleId: './pages/errors/500', nav: false, title: 'Server Error', name: '500' },
        { route: 'unknownerror', moduleId: './pages/errors/unknown', nav: false, title: 'Unknown Error', name: 'unknownerror' }

      ]);

      config.mapUnknownRoutes(instruction => {
        return "./pages/errors/404";
      });

    };

    this.router.configure(appRouterConfig);
  }

}
