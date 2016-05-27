//import 'bootstrap';
/*import 'bootstrap/css/bootstrap.css!';*/

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AppRouterConfig from 'app.router.config';

import {SmartCardAuth} from './smartCardAuth';
import {LookupCene} from './lookupCene';
//import HttpClientConfig from 'aurelia-auth/app.httpClient.config';
//import FetchConfig from 'aurelia-auth/app.fetch-httpClient.config';
import {FetchConfig} from 'aurelia-auth';

import {handle} from 'tkhyn/aurelia-flux';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router,FetchConfig, AppRouterConfig, SmartCardAuth,EventAggregator,LookupCene )
//@inject(Router,FetchConfig, AppRouterConfig )
export class App {

  primaryColor = '#ee6e73';
  accentColor = '#2bbbad';

  constructor(router, fetchConfig, appRouterConfig, smartCardAuth,events,lookupCene){
  //constructor(router, fetchConfig, appRouterConfig){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.smartCardAuth = smartCardAuth;
    this.lookupCene = lookupCene;
    // this.primaryColor = '#ee6e73';
    // this.accentColor = '#2bbbad';
    events.subscribe('router:navigation:complete', this.navigationComplete);

  }

  activate(){
    this.appRouterConfig.configure();
    this.fetchConfig.configure();
    this.smartCardAuth.start();
    return this.lookupCene.load();
  }

  @handle('CardInserted')
	cardInserted(action) {
    return this.smartCardAuth.auth.logout('#/logout').then(()=>this.router.navigate('login'));
	}

  @handle('CardRemoved')
	cardRemoved(action) {
    return this.smartCardAuth.auth.logout('#/logout').then(()=>this.router.navigate('login'));
    //this.router.navigate('login');
	}

  navigationComplete(navigationInstruction) {
    // Enable the materialize "waves" effect on the new page.
    Waves.displayEffect()
  }


}
