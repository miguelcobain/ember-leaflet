import InteractiveLayer from 'ember-leaflet/components/interactive-layer';

export default class ImageLayer extends InteractiveLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'url', 'bounds'];

  leafletOptions = [...this.leafletOptions, 'opacity', 'alt', 'crossOrigin', 'errorOverlayUrl', 'zIndex', 'className'];

  leafletDescriptors = [...this.leafletDescriptors, 'url', 'opacity', 'bounds'];

  leafletEvents = [...this.leafletEvents, 'load', 'error'];

  createLayer() {
    return this.L.imageOverlay(...this.requiredOptions, this.options);
  }
}
