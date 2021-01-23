import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

/**
 * Represents a point with x and y coordinates in pixels.
 * More information about its possible options [here](https://leafletjs.com/reference-1.7.1.html#divicon-option).
 *
 * @function icon
 * @param {Number} x the x coordinate
 * @param {Number} y the y coordinate
 * @param {Boolean} [round] if `true`, rounds the x and y values
 * @return {Point}
 */
export const point = isFastBoot
  ? function () {}
  : function point(params) {
      return L.point(...params);
    };

export default helper(point);
