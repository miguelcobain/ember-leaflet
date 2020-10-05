import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

export const latLngBounds = isFastBoot
  ? function () {}
  : function (latLngs) {
      return L.latLngBounds(latLngs);
    };

export default helper(latLngBounds);
