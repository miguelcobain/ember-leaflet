import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({

  leafletRequiredOptions: [
    'imageUrl', 'bounds'
  ],

  leafletOptions: [
    'attribution', 'opacity'
  ],

  leafletProperties: [
    'url', 'opacity'
  ],

  createLayer() {
    return this.L.imageOverlay(...this.get('requiredOptions'), this.get('options'));
  }
});
