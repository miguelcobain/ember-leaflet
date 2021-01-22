import PolygonLayer from 'ember-leaflet/components/polygon-layer';

export default class RectangleLayer extends PolygonLayer {
  createLayer() {
    return this.L.rectangle(...this.requiredOptions, this.options);
  }
}
