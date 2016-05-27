import { inject } from 'aurelia-framework';
import {ComponentService} from './shared/component-service';

@inject(ComponentService)
export class Podsistemi{

  constructor(componentService)
  {
    this.currentSubsystemIndex = componentService.currentSubsystemIndex;
    this.routerConfig = componentService.getRouterConfigSubsystem();
  }

  activate(params,routeConfig){


  }
  configureRouter( config, router){
    config.map( this.routerConfig );
    this.router = router;
  }

}
