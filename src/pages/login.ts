import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from 'aurelia-auth';
import { ValidationControllerFactory, ValidationController, ValidationRules } from 'aurelia-validation';

@inject(EventAggregator, AuthService, ValidationControllerFactory)
export class Login {

  private events: EventAggregator = null;
  private auth: AuthService = null;
  private validationController = null;
  private validationRules = null;

  private loginName: string = "";
  private password: string = "";
  private alertMessage: string = "No message here";
  private showAlert: boolean = false;

  constructor(eventAggregator, authService, validationControllerFactory) {
    this.events = eventAggregator;
    this.auth = authService;
    this.validationController = validationControllerFactory.createForCurrentScope();

    ValidationRules
      .ensure('loginName').displayName('Login Name').required().withMessage(`\${$displayName} is required and cannot be blank.`)
      .ensure('password').displayName('Password').required().withMessage(`\${$displayName} is required cannot be blank.`)
      .on(this);
  }

  activate() {

    if (this.auth.isAuthenticated())
    {
      this.events.publish("app:changeRoute", { routeName: "home" });
    }

    this.events.subscribe('login:showMessage', (payload) => {
      this.showAlert = true;
      this.alertMessage = payload.message;
    });

    this.events.publish("app:hideSidebar");
    this.events.publish("app:hideMenubar");
  }

  private login()
  {
    this.validationController.validate()
      .then((result) => {
        if (result.valid) {
          this.auth.login(this.loginName, this.password)
            .then((authResponse) => {
              if (authResponse.authFailed) {
                this.alertMessage = "Authentication failed, please ensure your username and password are correct";
                this.showAlert = true;
              }
            })
            .catch((authResponse) => {

              if (authResponse.status === 500) {
                // Server error 500 occured
                this.events.publish("app:changeRoute", { routeName: '500' });
                return;
              }

              alert("The server failed to authenticate");

            });
        }
        //else
        //{
        // Handle validation fail here if we need to do anything extra
        //}
      })
      .catch((result) => {
        alert("Validation exploded handle failiure case here");
      });
  }

}