export class ChildRouter{
  heading = 'Pod. ruter';

  configureRouter(config, router){
    config.map([
      { route: ['','welcome'],  moduleId: './about',      nav: true, title:'Dobrodosli' },
      { route: 'customer',        moduleId: './customer',       nav: true, title:'Flickr' }
      //{ route: 'child-router',  moduleId: './child-router', nav: true, title:'Pod-ruter' }
    ]);

    this.router = router;
  }
}
