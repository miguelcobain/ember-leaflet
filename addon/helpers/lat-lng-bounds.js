import Ember from 'ember';
/* global L */

const { Helper: { helper } } = Ember;
const isFastBoot = typeof FastBoot !== 'undefined';

export const latLngBounds = isFastBoot ? function() {} : function(latLngs) {
  return L.latLngBounds(latLngs);
};

export default helper(latLngBounds);
