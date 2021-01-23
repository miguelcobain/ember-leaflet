import ArrayPathLayer from 'ember-leaflet/components/array-path-layer';

/**
 * A class for drawing polyline overlays on a map.
 *
 * @class PolylineLayer
 * @extends ArrayPathLayer
 */
export default class PolylineLayer extends ArrayPathLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     * How much to simplify the polyline on each zoom level.
     * More means better performance and smoother look, and less
     * means more accurate representation.
     * Defaults to `1.0`.
     *
     * @argument smoothFactor
     * @type {Number}
     */
    'smoothFactor',

    /**
     * Disable polyline clipping.
     * Defaults to `false`.
     *
     * @argument noClip
     * @type {Boolean}
     */
    'noClip'
  ];

  createLayer() {
    return this.L.polyline(...this.requiredOptions, this.options);
  }
}
