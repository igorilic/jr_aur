export class EntityViewModel {
  service;
  entityManager;
  entity;

  constructor(service) {
    console.log('********EntityViewModel konstruktor!!');
    this.service = service;
  }

  activate(info) {
    var promise;

    // Kreiranje novog ili punjenje postojeceg entiteta
    if (info.id === 'novi') {
      promise = this.service.createNew();
    } else {
      promise = this.service.loadExisting(info.id);
    }

    return promise.then(result => {
      this.entityManager = result.entityManager;
      this.entity = result.entity;

    });
  }

  canDeactivate() {
    // dozvola odlaska sa novih enetiteta.
    if (this.entity.entityAspect.entityState.isAdded()) {
      Materialize.toast('Dodavanje novog je otkazano.', 2000);
      return true;
    }

    // disallow navigating away from modified entities.
    if (this.hasChanges) {
      // throttle the amount of toast we pop.
      if (!this._lastPop || +new Date() - this._lastPop > 1000) {
        this._lastPop = +new Date();
        Materialize.toast('Navigacija je otkazana.  Sačuvajte Vaše izmene!', 3000);
      }
      return false;
    }
    // permit navigating away from unmodified entities.
    return true;
  }

  get hasChanges() {
    return this.entityManager.hasChanges();
  }

  save() {
    this.entityManager.saveOptions = new breeze.SaveOptions({ allowConcurrentSaves: true });
    this.entityManager.saveChanges()
    .then( () => Materialize.toast('Izmene sačuvane.', 2000))
    .catch( (err) => Materialize.toast('GRESKA!  Izmene nisu prihavćene.: ' + err.toString(), 3000));
    // fake save...
    // this.entityManager.acceptChanges();
    // Materialize.toast('Izmene sačuvane.', 3000)
  }

  revert() {
    this.entityManager.rejectChanges();
    Materialize.toast('Povratak na stanje pre izmena.', 3000)

    // workaround Materialize datepicker binding timezone issue.
    if (this.hasChanges) {
      this.entityManager.rejectChanges();
    }
  }
}
