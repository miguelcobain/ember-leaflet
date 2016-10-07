import PolylineLayer from 'ember-leaflet/components/polyline-layer';

export default PolylineLayer.extend({
  createLayer() {
    return this.get('L').polygon(...this.get('requiredOptions'), this.get('options'));
  }
});
