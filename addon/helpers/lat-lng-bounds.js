import Ember from 'ember';
/* global L */

export function latLngBounds(params) {
  return L.latLngBounds(...params);
}

export default Ember.Helper.helper(latLngBounds);
