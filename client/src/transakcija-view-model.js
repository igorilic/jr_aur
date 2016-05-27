export class TransakcijaViewModel {
  service;
  entityManager;
  transakcija;

  constructor(service) {
    console.log('******** TransakcijaViewModel konstruktor!!');
    this.service = service;
  }

  activate() {
    var promise;

    // Kreiranje nove transakcije
    promise = this.service.novaTransakcija();

    return promise.then(result => {
      this.entityManager = result.entityManager;
      this.transakcija = result.entity;

    });
  }

  canDeactivate() {
    // dozvola odlaska sa novih enetiteta.
    // if (this.entity.entityAspect.entityState.isAdded()) {
    //   Materialize.toast('Dodavanje novog je otkazano.', 2000);
    //   return true;
    // }

    // disallow navigating away from modified entities.
    if (this.hasChanges) {
      // throttle the amount of toast we pop.
      if (!this._lastPop || +new Date() - this._lastPop > 1000) {
        this._lastPop = +new Date();
        Materialize.toast('Ne možete izaći iz tekuće transakcije!\nSačuvajte Vašu transakciju ili je poništite.', 3000);
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
    .then( () => Materialize.toast('Transakcija uspešno izvrešena!', 2000))
    .catch( (err) => Materialize.toast('GREŠKA!  Neuspeh u izvrešenju transakcije.\n' + 'Opis: ' + err.toString(), 3000));
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
