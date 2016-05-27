//import breeze from 'breeze';
import {Settings} from '../../settings';
import {createEntityManager} from '../../entity-manager-factory';

export class CeneObracunService {
  getPage(pageIndex) {
    let settings = new Settings();
    var query = new breeze.EntityQuery
      .from('CeneObracun')
      .select('ID_CEN_OBRACUN,SIF_CENE_OPISI.NAZIV_CENOVNIKA, OPSEG_OD,OPSEG_DO,FIKSNI_IZNOS_POST,PROCENAT_POST,ZA_NAREDNIH,'+
              'FIKSNI_DODATNI_IZNOS,ZONA_1,ZONA_2,ZONA_3,ZONA_4,FIKSNI_IZNOS_POST_DOM,PROCENAT_POST_DOM,FORMULA')
      .orderByDesc('ID_CEN_OBRACUN')
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
    var orderQuery = new breeze.EntityQuery().from('CeneObracun').where('ID_CEN_OBRACUN', '==', idnum);

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
    var orderQuery = new breeze.EntityQuery().from('CeneObracun').where('ID_CEN_OBRACUN', '==', idnum);

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
