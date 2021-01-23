// BEGIN-SNIPPET actions.js
import Controller from '@ember/controller';
import { action } from '@ember/object';

import { tracked } from '@glimmer/tracking';

export default class ActionsController extends Controller {
  @tracked lat = 45.519743;
  @tracked lng = -122.680522;
  @tracked zoom = 10;

  @action
  updateCenter(e) {
    let { lat, lng } = e.target.getCenter();

    if (this.lat !== lat) {
      this.lat = lat;
    }

    if (this.lng !== lng) {
      this.lng = lng;
    }
  }
}
// END-SNIPPET
