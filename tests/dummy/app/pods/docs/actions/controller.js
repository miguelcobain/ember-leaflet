// BEGIN-SNIPPET actions.js
import Controller from '@ember/controller';
import { action } from '@ember/object';

// NOTE: this example uses ember decorators and native classes
export default class ActionsController extends Controller {
  lat = 45.519743;
  lng = -122.680522;
  zoom = 10;

  @action
  updateCenter(e) {
    let center = e.target.getCenter();
    this.set('lat', center.lat);
    this.set('lng', center.lng);
  }
}
// END-SNIPPET
