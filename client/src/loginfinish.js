import {inject} from 'aurelia-framework';
import {NodeModel} from './shared/node-model';
import {Redirect,Router} from 'aurelia-router';
//import {Poslovi} from './poslovi';
import {ComponentService} from './shared/component-service';
@inject(ComponentService,Router)
export class LoginFinish {
  constructor(componentService,router) {
    this.componentService = componentService;
    this.myrouter = router;
    //this.fillPromise = this.componentService.getRootNodes();
  }

// activate(){
//   return new Redirect('#/usermenu');
//
// }
  triggerFill(){
   return this.fillRootNodes();
 }

  fillRootNodes(){
    this.componentService.getRootNodes()
    .then( c =>
      {
        this.componentService.menuItems = c;
        this.componentService.buildMenus();
        console.log('duzina menija: ' + this.componentService.rootNodes.length);
        //this.routerConfig=this.getPodsisRouterConfig();
        this.componentService.getPodsisRouterConfig();
        return this.myrouter.navigate('podsistem');   // bilo dashboard
        //return new Redirect('/usermenu');
      });

  }

}
