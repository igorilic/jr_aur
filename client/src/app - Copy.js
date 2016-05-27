import 'bootstrap';
/*import 'bootstrap/css/bootstrap.css!';*/

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AppRouterConfig from 'app.router.config';

import {SmartCardAuth} from './smartCardAuth';
//import HttpClientConfig from 'aurelia-auth/app.httpClient.config';
//import FetchConfig from 'aurelia-auth/app.fetch-httpClient.config';
import {FetchConfig} from 'aurelia-auth';

import {handle} from 'tkhyn/aurelia-flux';

@inject(Router,FetchConfig, AppRouterConfig, SmartCardAuth )
//@inject(Router,FetchConfig, AppRouterConfig )
export class App {

  constructor(router, fetchConfig, appRouterConfig, smartCardAuth){
  //constructor(router, fetchConfig, appRouterConfig){
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.smartCardAuth = smartCardAuth;
  }

  activate(){
    this.appRouterConfig.configure();
    this.fetchConfig.configure();
    this.smartCardAuth.start();
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

}
