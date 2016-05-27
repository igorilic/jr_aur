import {Behavior,inject} from 'aurelia-framework';
import {NodeModel} from '../shared/node-model';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class MenuTreeView {
  constructor(http){
    this.http = http;
    this.http.configure(config => {
        config
        .useStandardConfiguration()
        .withBaseUrl('https://localhost:44300/');          //
    });
  }

  menuItems = [];
  menuNodes = [];
  rootNodes = [];
  routerConfig = [];

  url = 'api/Zadaci/1';

  activate(){
    //if(this.menuItems.length == 0){
      return  this.http.fetch(this.url)
      .then( response =>  response.json())
      .then( c =>
        {
          this.menuItems = c;
          this.buildMenus();
          console.log('duzina menija: ' + this.rootNodes.length);
        });
    //}
  }
   get rootNodesLength(){
     return this.rootNodes.length;
   }
   buildMenus(){
    this.menuItems.forEach( item => {
      let node = new NodeModel(item);
      this.menuNodes.push( node );
      if( item.ParentMenuItemId === null){
        // create new root node
        let nodeRoot = node;
        this.rootNodes.push ( nodeRoot );
      }
      else {
        // subnodes
        // find parent item
        let parentItem = this.menuNodes.find( nodeItem => nodeItem.itemId === node.parentItemId );
        if( parentItem ){
          parentItem.children.push( node );
        }
      }
    });
  }

    // configureRouter(config, router) {
    //   this.buildRouteConfig(this.menuItems)
    //   .then(
    //     config.map(this.routerConfig)
    //   )
    //   .then(
    //     this.router = router
    //   );
    //
    // }

    buildRouteConfig(menuItems){

      if(menuItems.length == 0){
        return this.http.fetch(this.url)
        .then(response =>  response.json())
        .then(c => this.menuItems = c)
        .then(
          this.menuItems.forEach( item => {
              let route  = {};
              route.name = item.MenuText || item['$id'];
              route.route = item.Url;
              route.moduleId = item.ViewModel;
              route.title = item.MenuTextDescription;
              routerConfig.push(route);
          }));
        }
        else {
            return menuItems.forEach( item => {
                let route  = {};
                route.name = item.MenuText || item['$id'];
                route.route = item.Url;
                route.moduleId = item.ViewModel;
                route.title = item.MenuTextDescription;
                routerConfig.push(route);

          });
        }
    }
  }
//"MenuItemId":20,
//"ParentMenuItemId":null,
//"MenuTextDescription":"Šalter",
//"MenuText":null,
//"Url":null,
//"ViewTemplate":null,
//"ViewModel":null,
//"MenuOrder":null,
//"Tooltip":null
