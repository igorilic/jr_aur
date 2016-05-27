import { inject } from 'aurelia-framework';
import {ComponentService} from './shared/component-service';

@inject(ComponentService)
export class Subtasks {
  constructor(componentService) {
    this.currentSubsystemIndex = componentService.currentSubtaskIndex;
    this.routerConfig = componentService.getRouterConfigSubtasks();
  }

activate(params){

}
  configureRouter( config, router){
    config.map( this.routerConfig );
    this.router = router;
  }

}
