import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

export const divIcon = isFastBoot ? function() {} : function divIcon(_, hash) {
  return L.divIcon(hash);
};

export default helper(divIcon);
