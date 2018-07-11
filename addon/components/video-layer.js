import ImageLayer from 'ember-leaflet/components/image-layer';

export default ImageLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'video', 'bounds'
  ]),

  leafletOptions: Object.freeze([
    'autoplay', 'loop'
  ]),

  leafletProperties: Object.freeze([
    'url', 'opacity', 'bounds'
  ]),

  createLayer() {
    return this.L.videoOverlay(...this.get('requiredOptions'), this.get('options'));
  }
});
