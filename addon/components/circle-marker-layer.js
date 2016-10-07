import PointPathLayer from 'ember-leaflet/components/point-path-layer';

export default PointPathLayer.extend({

  leafletOptions: [
    'radius'
  ],

  leafletProperties: [
    'radius'
  ],

  createLayer() {
    return this.get('L').circleMarker(...this.get('requiredOptions'), this.get('options'));
  }
});
