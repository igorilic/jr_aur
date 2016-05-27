import {Settings} from './settings';

var entityManager;

/**
* Creates Breeze EntityManager instannewces.
*/
export function createEntityManager() {

  if (entityManager) {
    return Promise.resolve(copyEntityManager());
  }

  let settings = new Settings();

  entityManager = new breeze.EntityManager(settings.serviceName);
  return entityManager.fetchMetadata()
    .then(() => copyEntityManager());
}

function copyEntityManager() {
  var copy = entityManager.createEmptyCopy();
  copy.entityChanged.subscribe(logChanges);
  return copy;
}

// log entity changes to the console for debugging purposes.
function logChanges(data) {
  var message = 'Entitet je izmenjen.  Entitet: ' + (data.entity ? data.entity.entityType.name + '/' + data.entity.entityAspect.getKey().toString() : '?') + ';  EntityAction: ' + data.entityAction.getName() + '; ';
  if (data.entityAction === breeze.EntityAction.PropertyChange) {
    var pcArgs = data.args;
    message += 'Naziv svojstva (property-ja): ' + (pcArgs.propertyName || 'null') + '; Stara vrednost: ' + (pcArgs.oldValue ? pcArgs.oldValue.toString() : 'null') + '; Nova vrednost: ' + (pcArgs.newValue ? pcArgs.newValue.toString() : 'null') + ';';
  }
  if (data.entityAction === breeze.EntityAction.EntityStateChange) {
    message += 'Novo stanje: ' + data.entity.entityAspect.entityState.getName() + ';';
  }
  console.log(message);
};
