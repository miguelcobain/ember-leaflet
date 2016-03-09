import Ember from 'ember';
/* global L */

export function divIcon(_, hash) {
  return L.divIcon(hash)
}

export default Ember.Helper.helper(divIcon);
