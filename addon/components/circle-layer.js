import PointPathLayer from 'ember-leaflet/components/point-path-layer';

export default PointPathLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'radius'
  ]),

  leafletProperties: Object.freeze([
    'radius'
  ]),

  createLayer() {
    return this.L.circle(...this.get('requiredOptions'), this.options());
  }
});
