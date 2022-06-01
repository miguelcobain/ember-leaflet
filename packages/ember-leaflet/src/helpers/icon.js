import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

/**
 * Represents an icon to provide when creating a marker.
 * More information about its possible options [here](https://leafletjs.com/reference-1.7.1.html#icon-option).
 *
 * @function icon
 * @param {Object} options the Icon options object
 * @return {Icon}
 */
export const icon = isFastBoot
  ? function () {}
  : function icon(_, hash) {
      // https://github.com/emberjs/ember.js/issues/14668
      let options = Object.assign({}, hash);
      return L.icon(options);
    };

export default helper(icon);
