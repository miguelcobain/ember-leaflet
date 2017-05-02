import Ember from 'ember';
/* global L */

export function rect(params) {
  return L.rectangle(...params);
}

export default Ember.Helper.helper(rect);
