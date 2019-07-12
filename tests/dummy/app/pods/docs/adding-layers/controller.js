// BEGIN-SNIPPET adding-layers.js
import Controller from '@ember/controller';

// NOTE: this example uses ember decorators and native classes
export default class AddingLayersController extends Controller {
  lat = 45.528298;
  lng = -122.662986;
  zoom = 14;

  emberConfLocation = [45.528298, -122.662986];

  hotel = [45.530891, -122.655504];
}
// END-SNIPPET
