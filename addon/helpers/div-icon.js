import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;
const isFastBoot = typeof FastBoot !== 'undefined';

export const divIcon = isFastBoot ? function() {} : function divIcon(_, hash) {
  return L.divIcon(hash);
};

export default helper(divIcon);
