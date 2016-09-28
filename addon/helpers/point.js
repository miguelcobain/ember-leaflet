import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;

export function point(params) {
  return L.point(...params);
}

export default helper(point);
