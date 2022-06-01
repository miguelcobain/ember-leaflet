import PolylineLayer from 'ember-leaflet/components/polyline-layer';

/**
 * A class for drawing polygon overlays on a map. Extends Polyline.
 * Note that points you pass when creating a polygon shouldn't have
 * an additional last point equal to the first one — it's better to filter out such points.
 *
 * @class PolygonLayer
 * @extends PolylineLayer
 */
export default class PolygonLayer extends PolylineLayer {
  createLayer() {
    return this.L.polygon(...this.requiredOptions, this.options);
  }
}
