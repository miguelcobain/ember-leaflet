import ArrayPathLayer from 'ember-leaflet/components/array-path-layer';

export default ArrayPathLayer.extend({
  leafletOptions: Object.freeze([
    'smoothFactor', 'noClip'
  ]),

  createLayer() {
    return this.L.polyline(...this.get('requiredOptions'), this.get('options'));
  }
});
