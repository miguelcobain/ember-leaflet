import Ember from 'ember';
/* global L */

export function icon(_, hash) {
  return L.icon(hash);
}

export default Ember.Helper.helper(icon);
