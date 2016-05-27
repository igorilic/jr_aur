import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(AuthService,Router )

export class Logout{
	constructor(authService,router){
		this.authService = authService;
		this.router = router;
	};

	 activate(){
		 if(this.authService.isAuthenticated){
			 this.authService.logout("#/login")
	 		.then(response=>{
	 			console.log("ok logged out on  logout.js");
				this.router.navigate('login');
	 		})
	 		.catch(err=>{
	 			console.log("error logged out  logout.js");
				this.router.navigate('login');

	 		});
		}else {
			this.router.navigate('login');
		}
	}
}
