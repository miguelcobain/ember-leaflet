import PointPathLayer from 'ember-leaflet/components/point-path-layer';

export default PointPathLayer.extend({

  leafletOptions: Object.freeze([
    'radius'
  ]),

  leafletProperties: Object.freeze([
    'radius'
  ]),

  createLayer() {
    return this.L.circleMarker(...this.get('requiredOptions'), this.options());
  }
});
