import {inject} from 'aurelia-framework';
import {NodeModel} from './shared/node-model';
import {Router} from 'aurelia-router';
//import {Poslovi} from './poslovi';
import {ComponentService} from './shared/component-service';

@inject(ComponentService,Router)
export class Dashboard {

  menuItems = [];

  constructor(componentService,router){
    this.componentService = componentService;
    this.heading = "Raspoložive aplikacije - šalterski sistem";
    this.router = router;
  }

  activate(param){
    //this.current_app = param.id_app;
    this.menuItems = this.componentService.getRootMenus();
  }

  activateSubsystem(itemId){
        this.componentService.setCurrentSubsystem(itemId) ;
        this.router.navigate('podsistemi/' + itemId);
  }

}
