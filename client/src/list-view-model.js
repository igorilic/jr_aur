import {Settings} from './settings';

export class ListViewModel {
  router;
  route;
  service;
  entities = [];
  pageCount = 0;
  pageIndex = 0;
  isLoading = false;

  constructor(route, router, service) {
    this.settings = new Settings();
    this.route = route;
    this.router = router;
    this.service = service;
    this.pageSize = this.settings.pageSize;
  }

  activate() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.service.getPage(this.pageIndex)
      .then(result => {
        this.entities = result.entities;
        this.pageCount = result.pageCount;
        this.isLoading = false;
      });
  }

  removeItem(itemId,index){
    var promise;
    promise = this.service.removeExisting(itemId);
//entity.ID_CEN_OBRACUN
    promise.then(result => {
      let entityManager = result.entityManager;
      let entity = result.entity;
      entity.entityAspect.setDeleted();
      entityManager.saveOptions = new breeze.SaveOptions({ allowConcurrentSaves: true });
      entityManager.saveChanges()
      .then( () => {
       Materialize.toast('Uklonjeno.', 2000);})
      .catch( (err) => Materialize.toast('GRESKA! Brisanje nije prihavćeno.: ' + err.toString(), 3000));
    });
    this.entities.splice(index,1);
  }

  setPage(index) {
    this.pageIndex = index;
    this.load();
  }

  open(id) {
    this.router.navigate(this.route + '/' + id);
  }
}
