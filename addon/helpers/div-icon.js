import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;

export function divIcon(_, hash) {
  return L.divIcon(hash);
}

export default helper(divIcon);
