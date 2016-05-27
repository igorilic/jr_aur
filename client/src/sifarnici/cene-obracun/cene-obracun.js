import {inject} from 'aurelia-framework';

import {EntityViewModel} from '../../entity-view-model';
import {CeneObracunService} from './cene-obracun-service';
import {LookupCene} from '../../lookupCene';

@inject(CeneObracunService, LookupCene)
export class CeneObracun extends EntityViewModel {
  ceneOpisi;

  constructor(service, lookupCene) {
    super(service);
    this.ceneOpisi = lookupCene.ceneOpisi;
  }

  get title() {
    if (this.entity.ID_CEN_OBRACUN <= 0) {
      return 'Nova obračun. cena';
    }
    return `Obračun. cena #${this.entity.ID_CEN_OBRACUN}`;
  }
}
