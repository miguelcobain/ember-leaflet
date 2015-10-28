import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['showMap', 'showRestaurants', 'showTheaters'],

  theaters: Ember.A([
    { name: 'Theater 1', lat: 51.495, lng:-0.09 },
    { name: 'Theater 2', lat: 51.495, lng:-0.11 },
    { name: 'Theater 3', lat: 51.495, lng:-0.07 }
  ]),

  restaurants: Ember.A([
    { name: 'Restaurant 1', lat: 51.515, lng:-0.09, description: 'I am a cool restaurant.' },
    { name: 'Restaurant 2', lat: 51.515, lng:-0.11, description: 'I am a cool restaurant.' },
    { name: 'Restaurant 3', lat: 51.515, lng:-0.07, description: 'I am a cool restaurant.' }
  ])
});
