import PolygonLayer from 'ember-leaflet/components/polygon-layer';

/**
 * A class for drawing rectangle overlays on a map.
 *
 * @class RectangleLayer
 * @extends PolygonLayer
 */
export default class RectangleLayer extends PolygonLayer {
  createLayer() {
    return this.L.rectangle(...this.requiredOptions, this.options);
  }
}
