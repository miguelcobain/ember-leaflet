import PointPathLayer from 'ember-leaflet/components/point-path-layer';

/**
 * A class for drawing circle overlays on a map.
 * It's an approximation and starts to diverge from a real circle closer
 * to poles (due to projection distortion).
 *
 * @class CircleLayer
 * @extends PointPathLayer
 */
export default class CircleLayer extends PointPathLayer {
  leafletRequiredOptions = [
    ...this.leafletRequiredOptions,

    /**
     * Radius of the circle, in meters.
     *
     * @argument radius
     * @type {Number}
     */
    'radius'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'radius'];

  createLayer() {
    return this.L.circle(...this.requiredOptions, this.options);
  }
}
