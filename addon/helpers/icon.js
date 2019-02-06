import { helper } from '@ember/component/helper';
import { assign } from '@ember/polyfills';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

export const icon = isFastBoot ? function() {} : function icon(_, hash) {
  // https://github.com/emberjs/ember.js/issues/14668
  let options = assign({}, hash);
  return L.icon(options);
};

export default helper(icon);
