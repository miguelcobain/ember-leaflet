import PointPathLayer from 'ember-leaflet/components/point-path-layer';

export default PointPathLayer.extend({

  leafletRequiredOptions: [
    'radius'
  ],

  leafletProperties: [
    'radius'
  ],

  createLayer() {
    return this.L.circle(...this.get('requiredOptions'), this.get('options'));
  }
});
