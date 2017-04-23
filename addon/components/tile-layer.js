import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({

  leafletRequiredOptions: [
    'url'
  ],

  leafletOptions: [
    'minZoom', 'maxZoom', 'maxNativeZoom', 'tileSize', 'subdomains',
    'errorTileUrl', 'attribution', 'tms', 'continuousWorld', 'noWrap',
    'zoomOffset', 'zoomReverse', 'opacity', 'zIndex', 'unloadInvisibleTiles',
    'updateWhenIdle', 'detectRetina', 'reuseTiles', 'bounds', 'className'
  ],

  leafletEvents: [
    'loading', 'load', 'tileloadstart', 'tileload', 'tileunload'
  ],

  leafletProperties: [
    'url', 'zIndex', 'opacity'
  ],

  createLayer() {
    return this.L.tileLayer(...this.get('requiredOptions'), this.get('options'));
  }
});
