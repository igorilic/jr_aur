import {inject} from 'aurelia-framework';

import {TransakcijaViewModel} from '../../transakcija-view-model';
import {ServisTransakcije} from '../servis-transakcije';

@inject(ServisTransakcije)
export class UplataPp21101 extends TransakcijaViewModel {
  tipoviPrihoda;
  vrsteUplata;
  naciniObrPostarine;
  opstine;

  constructor(service, lookupCene) {
    super(service);
  }

  activate(){
    super.activate();
    donesiTipovePrihoda();
    donesiVrsteUplata();
    donesuOpstine();
  }

  donesiTipovePrihoda(){
    var tipoviPrihodaQuery = new breeze.EntityQuery
      .from('TipoviPrihoda')
      .select('TIP_PRIHODA, NAZIV_VRSTE_UPLATE')
      .orderBy('NAZIV_VRSTE_UPLATE');

      return createEntityManager()
        .then(em => em.executeQuery(tipoviPrihodaQuery))
        .then(queryResults => {
          this.tipoviPrihoda = queryResults.results;
        });
  }

  donesiVrsteUplata(){
    var vrsteUplataQuery = new breeze.EntityQuery
      .from('VrsteUplata')
      .select('SIFRA_VRSTE_UPLATE, NAZIV_TIPA')
      .orderBy('NAZIV_TIPA');

      return createEntityManager()
        .then(em => em.executeQuery(vrsteUplataQuery))
        .then(queryResults => {
          this.vrsteUplata = queryResults.results;
        });
  }

  donesiNacineObrPostarina(){
    var naciniObrPostarinaQuery = new breeze.EntityQuery
      .from('NaciniObrPostarina')
      .select('SIF_NACIN_OBR, NAZIV')
      .orderBy('NAZIV');

      return createEntityManager()
        .then(em => em.executeQuery(naciniObrPostarinaQuery))
        .then(queryResults => {
          this.naciniObrPostarine = queryResults.results;
        });
  }

  donesiOpstine(){
    var opstine = new breeze.EntityQuery
      .from('Opstine')
      .select('SIF_OPSTINE, NAZIV_OPSTINE')
      .orderBy('NAZIV_OPSTINE');

      return createEntityManager()
        .then(em => em.executeQuery(vrsteUplataQuery))
        .then(queryResults => {
          this.opstine = queryResults.results;
        });
  }

  donesiBudzetskeOrganizacije(){
    var budzetskeOrganizacije = new breeze.EntityQuery
      .from('BudzetskeOrganizacije')
      .select('SIF_BUDZ_ORG, NAZIV_BUDZ_ORG')
      .orderBy('NAZIV_BUDZ_ORG');

      return createEntityManager()
        .then(em => em.executeQuery(vrsteUplataQuery))
        .then(queryResults => {
          this.opstine = queryResults.results;
        });
  }


}
