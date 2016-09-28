import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;

export function icon(_, hash) {
  return L.icon(hash);
}

export default helper(icon);
