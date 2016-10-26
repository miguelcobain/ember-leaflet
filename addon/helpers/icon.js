import Ember from 'ember';
import L from 'ember-leaflet/L';

const { Helper: { helper } } = Ember;

export function icon(_, hash) {
  return L.icon(hash);
}

export default helper(icon);
