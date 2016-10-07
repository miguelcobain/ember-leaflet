import ArrayPathLayer from 'ember-leaflet/components/array-path-layer';

export default ArrayPathLayer.extend({
  leafletOptions: [
    'smoothFactor', 'noClip'
  ],

  createLayer() {
    return this.get('L').polyline(...this.get('requiredOptions'), this.get('options'));
  }
});
