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
    let center = e.target.getCenter();
    this.lat = center.lat;
    this.lng = center.lng;
  }
}
// END-SNIPPET
