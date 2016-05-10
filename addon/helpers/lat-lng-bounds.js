import Ember from 'ember';
/* global L */

export function latLngBounds(latLngs) {
  return L.latLngBounds(latLngs);
}

export default Ember.Helper.helper(latLngBounds);
