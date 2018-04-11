import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  lat: 45.528298,
  lng: -122.662986,
  zoom: 14,
  emberConfLocation: computed(function() {
    return [45.528298, -122.662986];
  }),

  hotel: computed(function() {
    return [45.530891, -122.655504];
  })
});
