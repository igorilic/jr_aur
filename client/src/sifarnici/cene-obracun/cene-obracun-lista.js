import {ListViewModel} from '../../list-view-model';
import {inject, singleton} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {CeneObracunService} from './cene-obracun-service';

@inject(AppRouter, CeneObracunService)
@singleton()
export class CeneObracunLista extends ListViewModel {
  constructor(router, service) {
    super('cene-obracun', router, service)
  }
}
