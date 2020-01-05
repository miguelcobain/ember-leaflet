import PolygonLayer from 'ember-leaflet/components/polygon-layer';

export default PolygonLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'bounds'
  ]),

  leafletProperties: Object.freeze([
    'bounds'
  ]),

  createLayer() {
    return this.L.rectangle(...this.get('requiredOptions'), this.get('options'));
  }
});
