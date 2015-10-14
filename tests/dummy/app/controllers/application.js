import Ember from 'ember';

export default Ember.Controller.extend({

  model: Ember.A([
    { name: 'Marker 1', lat: 51.505, lng:-0.09 },
    { name: 'Marker 2', lat: 51.505, lng:-0.11 },
    { name: 'Marker 3', lat: 51.505, lng:-0.07 }
  ])
});
