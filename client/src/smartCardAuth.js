//import $ from 'jquery';
import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {SignalRClient} from 'shared/signalr-client';
import {Dispatcher} from 'tkhyn/aurelia-flux';
import {CardEventStore} from './cardEventStore';
//import {Router} from 'aurelia-router';

@inject(AuthService,SignalRClient,Dispatcher,CardEventStore)
export class SmartCardAuth{

  constructor(auth,signalr,dispatcher,ces) {

    this.hubName = 'GemCardHub';
    this.hubCardInsertedFunc = 'cardInserted';
    this.hubCardRemovedFunc = 'cardRemoved';
    this.cardInserted = false;
    this.cardConnected = false;
    this.cardRemoved = true;
    this.cardError = false;
    this.hub =   signalr;     //            signalR;
    this.auth = auth;
    this.myrouter = null;
    this.userName = null;
    this.cardNumber = null;
    this.pinCode = null;
    this.proxy = null;
    this.dispatcher = dispatcher;
  }

  start() {
    this.hub.createHub(this.hubName);
    this.hub.setCallback(this.hubName, this.hubCardRemovedFunc, this.handleCardRemoved);
    this.hub.setCallback(this.hubName, this.hubCardInsertedFunc, this.handleCardInserted);
    this.hub.start().then(()=>{
      //alert('konektovao se!');
      console.log ('Successfully CONNECTED on hub.');
      this.proxy = this.hub.getHubProxy('GemCardHub');
      this.proxy.invoke('InitCard').done((data) => {
              console.log ('Invocation of InitCard succeeded');
              this.cardError = false;
              if(data === true)
                return true;
          }).fail(function (error) {
              this.cardError = true;
              console.log('Invocation of InitCard failed. Error: ' + error);
          });

    });
    this.proxy = this.hub.getHubProxy('GemCardHub');
  }

  SelectCard()
  {
    try {
      return this.proxy.invoke('SelectCard');
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of SelectCard failed. Error: ' + err);
    } finally {

    }
    return false;
  }

  CardConnected()
  {
    try {
      this.proxy.invoke('CardConnected')
      .done((data) => {
              console.log ('Invocation of CardConnected succeeded');
              this.cardError = false;
              if(data === true)
                return true;
          }).fail(function (error) {
            this.cardError = true;
            console.log('Invocation of CardConnected failed. Error: ' + error);
          });
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of CardConnected failed. Error: ' + err);
    } finally {

    }
    return false;
  }

  CardInserted ()
  {
    try {
      return this.proxy.invoke('CardInserted');
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of CardInserted failed. Error: ' + err);
    } finally {

    }
  }

  InitCard(){
    this.proxy.invoke('InitCard').done((data) => {
            console.log ('Invocation of InitCard succeeded');
            this.cardError = false;
            if(data === true)
              return true;
        }).fail(function (error) {
            this.cardError = true;
            console.log('Invocation of InitCard failed. Error: ' + error);
        });
    return false;
  }

  GetCardData(){
    try {
      return this.proxy.invoke('GetCardData');
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of GetCardData failed. Error: ' + err);
    } finally {

    }
    return;
  }

  CardConnect()
  {
    try {
       return this.proxy.invoke('CardConnect');
      // .done(() => {
      //         console.log ('Invocation of CardConnect succeeded');
      //         this.cardError = false;
      //     }).fail(function (error) {
      //       this.cardError = true;
      //       console.log('Invocation of CardConnect failed. Error: ' + error);
      //     });
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of CardConnect failed. Error: ' + err);
    } finally {

    }
  }

  CardDisconnect()
  {
    try {
      return this.proxy.invoke('CardDisconnect');
      // .done(() => {
      //         console.log ('Invocation of CardDisconnect succeeded');
      //         this.cardError = false;
      //     }).fail(function (error) {
      //       this.cardError = true;
      //       console.log('Invocation of CardDisconnect failed. Error: ' + error);
      //     });
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of CardDisconnect failed. Error: ' + err);
    } finally {

    }
  }

  GetName()
  {
    try {
      return this.proxy.invoke('GetName');
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of GetName failed. Error: ' + err);
    } finally {

    }
    return;
  }

  GetCardNumber()
  {
    try {
      return this.proxy.invoke('GetCardNumber');
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of GetCardNumber failed. Error: ' + err);
    } finally {

    }
    return;
  }

  GetPIN()
  {
    try {
      return this.proxy.invoke('GetPIN');
    } catch (err) {
      this.cardError = true;
      console.log('Invocation of GetPIN failed. Error: ' + err);
    } finally {

    }
    return null;
  }


  handleCardRemoved = () => {
      this.cardRemoved = true;
      this.cardInserted = false;
      this.cardConnected = false;
      this.userName = null;
      this.cardNumber = null;
      this.pinCode = null;
      this.dispatcher.dispatch('CardRemoved');
      //this.myrouter.navigate("#/login");
    }
///  };

  handleCardInserted = () => {
      this.cardRemoved = false;
      this.cardInserted = true;
      this.cardConnected = false;
      this.userName = null;
      this.cardNumber = null;
      this.pinCode = null;
      this.dispatcher.dispatch('CardInserted');
      //this.myrouter.navigate("#/login");
    }
//  };
//
  async stop() {
    await his.hub.stop(this.hubName, this.hubFunc, this.handleNotifications);
  }

}
