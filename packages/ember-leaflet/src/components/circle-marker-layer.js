import PointPathLayer from 'ember-leaflet/components/point-path-layer';

/**
 * A circle of a fixed size with radius specified in pixels.
 *
 * @class CircleLayer
 * @extends PointPathLayer
 */
export default class CircleMarkerLayer extends PointPathLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     * Radius of the circle marker, in pixels. Defaults to `10`.
     *
     * @argument radius
     * @type {Number}
     */
    'radius'
  ];

  leafletDescriptors = [...this.leafletDescriptors, 'radius'];

  createLayer() {
    return this.L.circleMarker(...this.requiredOptions, this.options);
  }
}
