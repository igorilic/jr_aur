import { bindable,inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-framework';
//import { ComponentService } from '../shared/component-service';
import { getLogger } from 'aurelia-framework';
import { TaskQueue } from 'aurelia-framework';

@inject(Element, EventAggregator, TaskQueue)
export class NodeModel{
  constructor(menuItem, children){

    this.menuName = "menu" + menuItem.MenuItemId;
    this.menuDescription = menuItem.MenuTextDescription;
    this.menuLongDescription = menuItem.MenuText;
    this.url = menuItem.Url;
    this.viewTemplate = menuItem.ViewTemplate;
    this.viewModel = menuItem.ViewModel;
    this.menuOrder = menuItem.MenuOrder;
    this.tooltip = menuItem.Tooltip;

    this.itemId = menuItem.MenuItemId;
    this.parentItemId = menuItem.ParentMenuItemId;

    this.children = children || [];
    this.visible = true;

    if(this.hasChildren()){
      //this.icon = 'fa fa-minus';
      //this.expanded = true;
    }
  }
  hasChildren(){
    return this.children.length > 0;
  }
  toggleNode(){
    // for(var i = 0; i < this.children.length; i++){
    //   this.children[i].visible = !this.children[i].visible;
    // }
    // this.expanded = !this.expanded;
    // if(this.expanded === true){
    //   this.icon = 'fa fa-minus';
    // }
    // else{
    //   this.icon = 'fa fa-plus';
    // }
  }
}

//"MenuItemId":20,"ParentMenuItemId":null,"MenuTextDescription":"Šalter","MenuText":null,"Url":null,"ViewTemplate":null,"ViewModel":null,"MenuOrder":null,"Tooltip":null,"MenuId":1,"SubMenus":null,"ParentMenuItem":nul
