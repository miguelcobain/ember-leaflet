import PolygonLayer from 'ember-leaflet/components/polygon-layer';

export default PolygonLayer.extend({

  createLayer() {
    return this.L.rectangle(...this.get('requiredOptions'), this.get('options'));
  }
});
