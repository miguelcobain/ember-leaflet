import BaseLayer from './base-layer';

export default BaseLayer.extend({

  leafletRequiredOptions: [
    'url'
  ],

  leafletOptions: [
    'minZoom', 'maxZoom', 'maxNativeZoom', 'tileSize', 'subDomains',
    'errorTileUrl', 'attribution', 'tms', 'continuousWorld', 'noWrap',
    'zoomOffset', 'zoomReverse', 'opacity', 'zIndex', 'unloadInvisibleTiles',
    'updateWhenIdle', 'detectRetina', 'reuseTiles', 'bounds'
  ],

  leafletEvents: [
    'loading', 'load', 'tileloadstart', 'tileload', 'tileunload'
  ],

  leafletProperties: [
    'url', 'zIndex', 'opacity'
  ],

  createLayer() {
    return this.L.tileLayer(...this.get('requiredOptions'), this.get('options'));
  },

  isLoading: false,

  loading() {
    this.set('isLoading', true);
  },

  load() {
    this.set('isLoading', false);
  }
});
