import {bindable } from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
//import {AuthFilterValueConverter} from './authFilter';
//import {Router} from 'aurelia-router';
@inject(AuthService )
export class NavBar {
  _isAuthenticated=false;
  @bindable router = null;

  constructor(auth ){
  	this.auth = auth;
    this._isAuthenticated=this.auth.isAuthenticated();
  }
  //@computedFrom(this.auth)
  get isAuthenticated(){
  	return this.auth.isAuthenticated();
  }

 //  attached() {
 //   $('.button-collapse').sideNav();
 // }

  /*get navigationRoutes(){
  		return this.router.navigation.filter(r=>!r.config.auth);;

  	if(this.isAuthenticated){
  		return this.router.navigation;
  	}
  	else{
  		return this.router.navigation.filter(r=>!r.config.auth);
  	}
  }*/
}
