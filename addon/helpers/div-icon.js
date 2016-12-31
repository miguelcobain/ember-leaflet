import Ember from 'ember';
import L from 'ember-leaflet/L';

const { Helper: { helper } } = Ember;

export function divIcon(_, hash) {
  return L.divIcon(hash);
}

export default helper(divIcon);
