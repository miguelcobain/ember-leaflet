import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';
/* global L */

/**
 * Represents a rectangular geographical area on a map by defining two diagonally opposite corners of the rectangle.
 * Instead of two corners, you can also pass in an array of points, and the helper will return the rectangular
 * area that contains all those points.
 *
 * @function latLngBounds
 * @param {LatLng} corner1 first corner
 * @param {LatLng} corner2 second corner
 * @return {LatLngBounds}
 */
export const latLngBounds = isFastBoot
  ? function () {}
  : function (latLngs) {
      return L.latLngBounds(latLngs);
    };

export default helper(latLngBounds);
