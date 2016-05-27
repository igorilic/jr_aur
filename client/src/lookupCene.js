import {createEntityManager} from './entity-manager-factory';

var ceneOpisQuery = new breeze.EntityQuery
  .from('CeneOpisi')
  .select('SIF_CEN_OPIS, NAZIV_CENOVNIKA')
  .orderBy('NAZIV_CENOVNIKA');

/**
* Manages the application's shared lookups.
* Eagerly loading the lookups because there are only two.
*/
export class LookupCene {
  ceneOpisi;

  load() {
    return createEntityManager()
      .then(em => em.executeQuery(ceneOpisQuery))
      .then(queryResults => {
        this.ceneOpisi = queryResults.results;
      })
  }
}
