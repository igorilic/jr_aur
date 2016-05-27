//import $ from 'jquery';
//make sure to run jspm install npm:ms-signalr-client
import 'ms-signalr-client';
import {LogManager} from 'aurelia-framework';

const logger = LogManager.getLogger('communications/signalr');

export class SignalRClient {
  connection = {};
  proxy = {};
  debug = true;
  running = false;
  connection = null;

  createHub(hubName) {
    if(!this.connection) {
      this.connection = $.hubConnection('http://joca:8898');  //{hubBaseUrl}
      //The following can be used to pass certain data to the hub on connection such as user id.
      //this.connection.qs = { UserId: '{SomeUserId}', Token: '{SomeUserToken}' };
    }
    var hubName = hubName.toLocaleLowerCase();
    if(!this.connection.proxies[hubName]) {
      this.proxy = this.connection.createHubProxy(hubName);
      this.connection.proxies[hubName].funcs = {};
    }
  }

  getHubProxy(hubName){
    var hubName = hubName.toLocaleLowerCase();
    return   this.connection.proxies[hubName];
  }

  setCallback(hubName, funcName, callBack, cbNameOverride = null) {
    var hubName = hubName.toLocaleLowerCase();
    if(!this.connection.proxies[hubName].funcs[funcName]) {
      this.connection.proxies[hubName].funcs[funcName] = {};
      this.connection.proxies[hubName].on(funcName, function(data) {
        for(var func of Object.keys(this.connection.proxies[hubName].funcs[funcName])) {
          this.connection.proxies[hubName].funcs[funcName][func](data);
        }
      });
    }
    this.connection.proxies[hubName].funcs[funcName][cbNameOverride || callBack.name] = function(data) {
      callBack(data);
    };
  }

  start() {
    if(!this.running) {
      //this.connection.start({ jsonp: true })
      return this.connection.start({ jsonp: false })
        .done(function() {
          this.running = true;
          if(this.debug)
            logger.debug('Konektovao se, connection Id=' + this.connection.id);
            return true;
        })
        .fail(function() {
          if(this.debug)
            logger.debug('Ne može da se konektuje');
            return false;
        });
    }
  }

  stop(hubName, funcName, callBack, cbNameOverride = null) {
    if(this.running) {
      logger.debug('Hub zaustavljen.');
      if(this.connection.proxies[hubName]) {
        if(this.connection.proxies[hubName].funcs[funcName]) {
          delete this.connection.proxies[hubName].funcs[funcName][cbNameOverride || callBack.name];
        }

        if(Object.keys(this.connection.proxies[hubName].funcs[funcName]).length === 0)
          delete this.connection.proxies[hubName].funcs[funcName];

        if(Object.keys(this.connection.proxies[hubName].funcs).length === 0)
          delete this.connection.proxies[hubName];
      }

      if(Object.keys(this.connection.proxies).length === 0) {
        this.connection.stop();
        this.running = false;
      }
    }
  }
}

//Example usage
// import {inject} from 'aurelia-framework';
// import {SignalRClient} from 'shared/signalr-client';
//
// @inject(SignalRClient)
// export class Test {
//   constructor(signalR) {
//     this.hubName = 'notificationHub';
//     this.hubFunc = 'getNotificaions';
//
//     this.hub = signalR;
//   }
//
//   activate() {
//     this.hub.createHub(this.hubName);
//     this.hub.setCallback(this.hubName, this.hubFunc, this.handleNotifications);
//     this.hub.start();
//   }
//
//   handleNotifications = (data) => {
//     data = $.parseJSON(data);
//     //handle notifications
//   };
//
//   deactivate() {
//     this.hub.stop(this.hubName, this.hubFunc, this.handleNotifications);
//   }
// }
