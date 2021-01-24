import PathLayer from 'ember-leaflet/components/path-layer';

/**
 * An abstract class that contains options and constants shared between point-based path layers (Circle, CircleMarker). Do not use it directly.
 *
 * @class PointPathLayer
 * @extends ember-leaflet/components/path-layer~PathLayer
 */
export default class PointPathLayer extends PathLayer {
  /**
   * The latitude where the point layer will be placed at.
   * You can provide a `@location` instead of `@lat` and `@lng`.
   *
   * @argument lat
   * @type {Number}
   */

  /**
   * The longitude where the point layer will be placed at.
   * You can provide a `@location` instead of `@lat` and `@lng`.
   *
   * @argument lng
   * @type {Number}
   */

  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * A geographical point where the point layer will be placed at.
     * This is an alternative to providing `@lat` and `@lng`.
     *
     * @argument location
     * @type {LatLng}
     */
    'location'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'location:setLatLng'];

  get location() {
    if (this.args.location) {
      return this.args.location;
    } else {
      let [lat, lng] = [this.args.lat, this.args.lng];
      return this.L.latLng(lat, lng);
    }
  }
}
