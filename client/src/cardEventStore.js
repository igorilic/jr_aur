import {handle} from 'tkhyn/aurelia-flux';
import {Redirect} from 'aurelia-router';
export class CardEventStore {

  constructor(){
  }

	@handle('CardInserted')
	cardInserted(action) {
	}

  @handle('CardRemoved')
	cardRemoved(action) {
	}

}
