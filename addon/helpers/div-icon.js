import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

/**
 * Represents a lightweight icon for markers that uses a simple `<div>` element instead of an image.
 * Inherits from Icon but ignores the iconUrl and shadow options.
 * More information about its possible options [here](https://leafletjs.com/reference-1.7.1.html#divicon-option).
 *
 * @function divIcon
 * @param {Object} options the DivIcon options object
 * @return {DivIcon}
 */
export const divIcon = isFastBoot
  ? function () {}
  : function divIcon(_, hash) {
      // https://github.com/emberjs/ember.js/issues/14668
      let options = Object.assign({}, hash);
      return L.divIcon(options);
    };

export default helper(divIcon);
