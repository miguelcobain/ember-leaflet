import Ember from 'ember';
import L from 'ember-leaflet/L';

const { Helper: { helper } } = Ember;

export function point(params) {
  return L.point(...params);
}

export default helper(point);
