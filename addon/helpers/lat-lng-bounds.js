import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;

export function latLngBounds(latLngs) {
  return L.latLngBounds(latLngs);
}

export default helper(latLngBounds);
