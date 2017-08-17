import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;
const isFastBoot = typeof FastBoot !== 'undefined';

export const point = isFastBoot ? function() {} : function point(params) {
  return L.point(...params);
};

export default helper(point);
