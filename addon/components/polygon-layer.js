import PolylineLayer from 'ember-leaflet/components/polyline-layer';

export default class PolygonLayer extends PolylineLayer {
  createLayer() {
    return this.L.polygon(...this.requiredOptions, this.options);
  }
}
