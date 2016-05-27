import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export default class{

	constructor(router){
		this.router = router;
	}
	configure(){
		var appRouterConfig = function(config){
			config.title = 'Pošta RS';
			config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.

			config.map([
				{ route: ['','index'],  moduleId: './about',     name:'about',        nav: true, title:'Dobrodošli' },
				{ route: 'cene-obracun',    moduleId: './sifarnici/cene-obracun/cene-obracun-section',  nav: true, title: 'Obračun cena', auth:true },
				{ route: 'customer',      moduleId: './customer',  name:'customer',     nav: false, title:'CRM', auth:true },
				{ route: 'signup',        moduleId: './signup',    name: 'signup',      nav: false, title:'Registracija' },
				{ route: 'login',         moduleId: './login',     name: 'login',       nav: false, title:'Prijava' },
				{ route: 'logout',        moduleId: './logout',    name: 'logout',      nav: false, title:'Odjava' },
				{ route: 'profile',       moduleId: './profile',   name: 'profile',     nav: false, title:'Profil', auth:true  },
				{ route: 'dashboard',      moduleId: './dashboard', name: 'dashboard',    nav: false, title:'Komandna tabla', auth:true  },
				{ route: 'podsistem',      moduleId: './dashboard', name: 'podsistem',    nav: true, title:'Komandna tabla' },
				{ route: 'loginfinish',      moduleId: './loginfinish', name: 'loginfinish',    nav: true, title:'Posle prijave', auth:true  },
				{ route: 'podsistemi/:id',      moduleId: './podsistemi', name: 'podsistemi',    nav: false, title:'aktivan podisistem' },
				//{ route: 'child-router',      moduleId: './child-router', name: 'child-router',    nav: true, title:'Chil router' }
				//{ route: '', redirect: 'index' }
				// { route: 'usermenu',      moduleId: './shared/menu-tree-view',          nav: true, title:'Korisnik - zadaci' }
				//{ route: 'md-collapsible',  name: 'md-collapsible', moduleId: './shared/md-collapsible', nav: true, title: 'Collapsible' }

				]);
			};

		this.router.configure(appRouterConfig);
	}

}
