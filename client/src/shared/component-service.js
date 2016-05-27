import {inject} from 'aurelia-framework';
import {NodeModel} from '../shared/node-model';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class ComponentService {
  baseUrl = 'http://joca/mvcauth/';    //'https://joca:44300/'
  url = 'api/Zadaci/1';

  menuItems = [];
  menuNodes = [];
  rootNodes = [];
  routerConfig = [];

  podsisRouterConfig = [];

  currentSubsystemIndex = null;
  currentSubtaskIndex = null;

  constructor(http) {
    this.http = http;
    this.http.configure(config => {
        config
        .useStandardConfiguration()
        .withBaseUrl(this.baseUrl);
    });
    //this.getRootNodes();
  }

  getRootNodes(){
    return  this.http.fetch(this.url)
    .then( response =>  response.json());
    // .then( c =>
    //   {
    //     this.menuItems = c;
    //     this.buildMenus();
    //     console.log('duzina menija: ' + this.rootNodes.length);
    //     //this.routerConfig=this.getPodsisRouterConfig();
    //   });
  }

  backgroundColors = ['red','pink','purple','deep-purple','indigo','blue'];
  getRootMenus(){
    let menus = [];
    if( this.rootNodesLength > 0){
      let sortedMenu = this.rootNodes.sort((a,b) =>  b.menuOrder - a.menuOrder).slice();
      let icolor = 0;
      let routeIndexCurrent=0;
      for ( let  podsis of sortedMenu){
          menus.push({ name: podsis.menuName , title: podsis.menuDescription, description:podsis.menuLongDescription, background: this.backgroundColors[icolor], menuId: podsis.itemId });
          icolor++;
          if ( icolor > this.backgroundColors.length)
            icolor = 0;
      }
    }
    return menus;
  }

  getPodsisRouterConfig(){
    let routes = [];

    let podsisModuleId = './podisistem';
    let podsisUrl = '/podsistem';    //       /:id';

    routes.push({ route: ['','podsistem'],  moduleId: './podsistem', name:'podsistem', nav: true, title:'U podistemu ste' });
    if( this.rootNodes.length > 0){
      for ( let  podsis of this.rootNodes){
          routes.push({ name: podsis.menuName  , route: podsisUrl, moduleId: podsisModuleId, nav: true, title: podsis.menuDescription});
      }
      this.podsisRouterConfig = routes;
    }
    return routes;

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
       // find parent item
       let parentItem = this.menuNodes.find( nodeItem => nodeItem.itemId === node.parentItemId );
       if( parentItem ){
         parentItem.children.push( node );
       }
     }
   });
 }

 setCurrentSubsystem( current){
   this.currentSubsystemIndex = current;
 }

 setCurrentSubtask( current){
   this.currentSubtaskIndex = current;
 }

 getRouterConfigSubsystem(){

    let currentSubIndex = this.currentSubsystemIndex;
    let currentSub = this.rootNodes[currentSubIndex];
    let currentSubName = this.rootNodes[currentSubIndex].menuDescription;

    let routes = [];

    let defaultModuleId = './groups-dashboard';
    let defaultUrl = 'groups-dashboard';    //       /:id';
    let defaultName = 'groups-dashboard';
    let defaultTitle = currentSubName;

    // add default route
    routes.push({ route: ['',defaultUrl],  moduleId: defaultModuleId, name:defaultName, nav: true, title: defaultTitle });
    // add subtasks routeName
    routes.push({ route: 'subtasks/:id', moduleId: './subtasks', name: 'subtasks', nav: false, title:'Podgrupe poslova'});

    // add all routes for current subsystem
    if( currentSub.children.length > 0){

      let groups = currentSub.children;
      for( let group of groups ){
          if ( group.children.length > 0 ){
            // go through all tasks fro current group
            let currentTaskGroup = group.children;
            for (let task of currentTaskGroup){
              if( task.children.length === 0){
                // add task route
                let routeModuleId = task.viewModel || './notimplemented';
                let routeName = task.menuName;
                let routeRoute = task.url || routeName;
                let routeTitle = task.menuDescription;

                routes.push({ name: routeName, route: routeRoute, moduleId: routeModuleId, nav: true, title: routeTitle});

              }
              else{
                let taskGroup = task.children;
              }
            }
          }
          else{
            // add to routes group without taska
            let routeModuleId = group.viewModel || './notimplemented';
            let routeName = group.menuName;
            let routeRoute = group.url || routeName;
            let routeTitle = group.menuDescription;

            routes.push({ name: routeName, route: routeRoute, moduleId: routeModuleId, nav: true, title: routeTitle});
          }
      }
    }
    return routes;
 }

getRouterConfigSubtasks(){
  let currentSubtaskIndex = this.currentSubtaskIndex;
  let currentSubtask = this.menuNodes[currentSubtaskIndex];
  let currentSubtaskName = this.menuNodes[currentSubtaskIndex].menuDescription;

  let routes = [];

  let defaultModuleId = './task-dashboard';
  let defaultUrl = 'task-dashboard';    //       /:id';
  let defaultName = 'task-dashboard';
  let defaultTitle = currentSubtaskName;

  // add default route
  routes.push({ route: ['',defaultUrl],  moduleId: defaultModuleId, name:defaultName, nav: true, title: defaultTitle });
  // add all routes for current subsystem
  if( currentSubtask.children.length > 0){

    let taskGroups = currentSubtask.children;
    for( let taskGroup of taskGroups ){
        if ( taskGroup.children.length > 0 ){
          // go through all tasks fro current group
          let currentTaskGroup = taskGroup.children;
          let currentSettings = { settings:[]};
          let currentSubmenus = [];
          for (let task of currentTaskGroup){
            if( task.children.length === 0){
              // add task route
              let routeModuleId = task.viewModel || './notimplemented';
              let routeName = task.menuName;
              let routeRoute = task.url || routeName;
              let routeTitle = task.menuDescription;
              let currentHref = "#/" + routeRoute;
              let currentTitle = routeTitle;
              let currentSubmenu = { href: currentHref, title: currentTitle};
              currentSubmenu.push(currentSubmenu);
              routes.push({ name: routeName, route: routeRoute, moduleId: routeModuleId, nav: false, title: routeTitle});

            }
            else{
              let taskGroupTask = task.children;
            }
          };  // end for
          currentSettings.settings = currentSubmenus;
          let routeModuleId = taskGroup.viewModel || './notimplemented';
          let routeName = taskGroup.menuName;
          let routeRoute = taskGroup.url || routeName;
          let routeTitle = taskGroup.menuDescription;

          routes.push({ name: routeName, route: routeRoute, moduleId: routeModuleId, nav: true, title: routeTitle, settings: currentSettings});

        }
        else{
          // add to routes group without taska
          let routeModuleId = taskGroup.viewModel || './notimplemented';
          let routeName = taskGroup.menuName;
          let routeRoute = taskGroup.url || routeName;
          let routeTitle = taskGroup.menuDescription;

          routes.push({ name: routeName, route: routeRoute, moduleId: routeModuleId, nav: true, title: routeTitle});
        }
    }
  }
  return routes;



}

 getIterableComponents(hideEmptyGroups = false) {
   let currentSubIndex = this.currentSubsystemIndex;
   let currentSub = this.rootNodes[currentSubIndex];

   let nodeGroups = currentSub.children;
   let taskGroups = [];

   for ( let nodeGroup of nodeGroups){
     if( nodeGroup.children.length > 0){
       let group ={
         title: nodeGroup.menuDescription,
         tasks: []
       };
       let task = {};
       for( let nodeTask of nodeGroup.children){
         if(nodeTask.children == 0){
            task = {
            title: nodeTask.menuDescription,
            link: nodeTask.url || nodeTask.menuName,
            subtasks: false
          }
        }
        else {
            task = {
            title: nodeTask.menuDescription,
            link: 'subtasks/' + nodeTask.itemId,                      //nodeTask.url || nodeTask.menuName,
            subtasks: true,
            itemId: nodeTask.itemId
         };
       }
       group.tasks.push(task);
     };
     taskGroups.push(group);
   }
 };
 return taskGroups;
}

}
