import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;
const isFastBoot = typeof FastBoot !== 'undefined';

export const icon = isFastBoot ? function() {} : function icon(_, hash) {
  return L.icon(hash);
};

export default helper(icon);
