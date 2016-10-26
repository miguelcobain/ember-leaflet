import Ember from 'ember';
import L from 'ember-leaflet/L';

const { Helper: { helper } } = Ember;

export function latLngBounds(latLngs) {
  return L.latLngBounds(latLngs);
}

export default helper(latLngBounds);
