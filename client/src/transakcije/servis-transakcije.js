//import breeze from 'breeze';
import {Settings} from '../settings';
import {createEntityManager} from '../entity-manager-factory';

export class ServisTransakcije {
  getPage(pageIndex) {
    let settings = new Settings();
    var query = new breeze.EntityQuery
      .from('BTransakcije')
      .orderByDesc('ID_TRANS')
      .skip(pageIndex * settings.pageSize)
      .take(settings.pageSize)
      .inlineCount();

    return createEntityManager()
      .then(em => em.executeQuery(query))
      .then(queryResult => {
        return {
          entities: queryResult.results,
          pageCount: Math.ceil(queryResult.inlineCount / settings.pageSize)
        };
      });
  }

  loadExisting(id) {
    let idnum = parseInt(id);
    var orderQuery = new breeze.EntityQuery().from('BTransakcija').where('ID_TRANS', '==', idnum);

    return createEntityManager()
      .then(em => Promise.all([em.executeQuery(orderQuery)]))
      .then(values => {
        var queryResult = values[0];
        return {
          entity: queryResult.results[0],
          entityManager: queryResult.entityManager
        };
      });
  }

  removeExisting(id) {
    let idnum = parseInt(id);
    var orderQuery = new breeze.EntityQuery().from('BTransakcija').where('ID_TRANS', '==', idnum);

    return createEntityManager()
      .then(em => em.executeQuery(orderQuery))
      .then(val => {
        let queryResult = val;
        return {
          entity: queryResult.results[0],
          entityManager: queryResult.entityManager
        };
      });
  }

  createNew() {
    return createEntityManager()
      .then(em => {
        return {
          entity: em.createEntity('SIF_CENE_OBRACUN'),
          entityManager: em
        };
      });
  }
}
