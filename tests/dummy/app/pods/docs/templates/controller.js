// BEGIN-SNIPPET just-templates.js
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { setProperties } from '@ember/object';

// NOTE: this example uses ember decorators and native classes
export default class TemplatesController extends Controller {
  lat = 45.528178;
  lng = -122.670059;
  zoom = 14;

  restaurants = [
    {
      name: 'Sinju Restaurant',
      rating: 4,
      lat: 45.528531,
      lng: -122.681682
    },
    {
      name: 'Burgerville',
      rating: 3.8,
      lat: 45.530970,
      lng: -122.661968
    },
    {
      name: 'Le Pigeon',
      rating: 4.5,
      lat: 45.522752,
      lng: -122.657979,
      isOpen: true
    }
  ];

  @computed('restaurants.@each.{lat,lng}')
  get dangerZone() {
    return this.restaurants.map((r) => ({ lat: r.lat, lng: r.lng }));
  }

  @action
  updateLocation(r, e) {
    let location = e.target.getLatLng();
    setProperties(r, {
      lat: location.lat,
      lng: location.lng
    });
  }
}
// END-SNIPPET
