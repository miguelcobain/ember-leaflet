import Ember from 'ember';
/* global L */

export function point(params) {
  return L.point(...params);
}

export default Ember.Helper.helper(point);
