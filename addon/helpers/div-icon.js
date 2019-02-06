import { helper } from '@ember/component/helper';
import { assign } from '@ember/polyfills';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

export const divIcon = isFastBoot ? function() {} : function divIcon(_, hash) {
  // https://github.com/emberjs/ember.js/issues/14668
  let options = assign({}, hash);
  return L.divIcon(options);
};

export default helper(divIcon);
