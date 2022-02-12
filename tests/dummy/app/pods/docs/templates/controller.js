// BEGIN-SNIPPET just-templates.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class Restaurant {
  @tracked name;
  @tracked rating;
  @tracked lat;
  @tracked lng;

  constructor({ name, rating, lat, lng }) {
    this.name = name;
    this.rating = rating;
    this.lat = lat;
    this.lng = lng;
  }
}

export default class TemplatesController extends Controller {
  lat = 45.528178;
  lng = -122.670059;
  zoom = 14;

  restaurants = [
    new Restaurant({
      name: 'Sinju Restaurant',
      rating: 4,
      lat: 45.528531,
      lng: -122.681682
    }),
    new Restaurant({
      name: 'Burgerville',
      rating: 3.8,
      lat: 45.53097,
      lng: -122.661968
    }),
    new Restaurant({
      name: 'Le Pigeon',
      rating: 4.5,
      lat: 45.522752,
      lng: -122.657979,
      isOpen: true
    })
  ];

  get dangerZone() {
    return this.restaurants.map((r) => ({ lat: r.lat, lng: r.lng }));
  }

  @action
  updateLocation(r, e) {
    let location = e.target.getLatLng();
    r.lat = location.lat;
    r.lng = location.lng;
  }
}
// END-SNIPPET
