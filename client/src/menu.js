import { bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { ComponentService } from './shared/component-service';
import { getLogger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-framework';
import {Router} from 'aurelia-router';
@inject(Element, ComponentService, EventAggregator, TaskQueue,Router)
export class Menu {
  @bindable() activeItem;
  subscriptions = [];

  constructor(element, componentService, eventAggregator, taskQueue,router) {
    this.groups = componentService.getIterableComponents(true);
    this.element = element;
    this.taskQueue = taskQueue;
    this.subscriptions.push(eventAggregator.subscribe('router:navigation:complete', e => this.routeChanged(e)));
    this.log = getLogger('menu');
    this.router = router;
    this.componentService = componentService;
  }

  setHome(){
    this.router.navigate('groups-dashboard');
  }

  setActive(task) {
    this.activeItem = task.link;
    return true;
  }

  setActiveSub(task){
    this.router.navigate('groups-dashboard');
    // this.activeItem = task.link;
    this.componentService.currentSubtaskIndex = task.itemId;
    this.router.navigate('subtasks/' + task.itemId);
    return true;
  }

  activeItemChanged(newValue, oldValue) {
    this.taskQueue.queueTask(() => {
      this.log.debug('activeItemChanged', newValue, oldValue);
      // find parent header and expand it
      let header = $('li.active', this.element).parents('.collapsible-body').siblings('.collapsible-header');
      if (header.length > 0) {
        header.addClass('active');
        header.parents('[md-collapsible]').get(0).au['md-collapsible'].viewModel.refresh();
      } else {
        this.log.warn('activeItemChanged', 'header not found');
      }
    });
  }

  routeChanged(e) {
    this.log.debug('routeChanged', e);
    let link = `#${e.instruction.fragment}`;
    this.activeItem = link.split('/').splice(0, 3).join('/');
  }

  detached() {
    this.subscriptions.forEach(i => i.dispose());
  }
}
