import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {SignalRClient} from 'shared/signalr-client';
import {Router} from 'aurelia-router';

@inject(AuthService ,SignalRClient,Router)
export class SmartCardAuth{

  constructor(signalR,auth,router) {
    this.hubName = 'GemCardHub';
    this.hubFunc = 'getNotificaions';
    this.cardInserted = false;
    this.cardRemoved = true;
    this.hub = signalR;
    this.auth = auth;
    this.router = router;
  }

  start() {
    this.hub.createHub(this.hubName);
    this.hub.setCallback(this.hubName, this.hubFunc, this.handleNotifications);
    this.hub.start();
  }

  handleNotifications = (data) => {
    data = $.parseJSON(data);
    //handle notifications
    switch(data){
      case: 'cardInserted'
        cardInserted = true;
      case: 'cardRemoved'
        // navigate login view
        if( auth.isAuthenticated){

        }
        this.router.navigate('login');
        break;
      default:

    }
  };

  stop() {
    this.hub.stop(this.hubName, this.hubFunc, this.handleNotifications);
  }

}
