import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'url'
  ]),

  leafletOptions: Object.freeze([
    'minZoom', 'maxZoom', 'maxNativeZoom', 'tileSize', 'subdomains',
    'errorTileUrl', 'attribution', 'tms', 'continuousWorld', 'noWrap',
    'zoomOffset', 'zoomReverse', 'opacity', 'zIndex', 'unloadInvisibleTiles',
    'updateWhenIdle', 'detectRetina', 'reuseTiles', 'bounds', 'className'
  ]),

  leafletEvents: Object.freeze([
    'loading', 'load', 'tileloadstart', 'tileload', 'tileunload'
  ]),

  leafletProperties: Object.freeze([
    'url:setUrl:noRedraw', 'zIndex', 'opacity'
  ]),

  createLayer() {
    return this.L.tileLayer(...this.get('requiredOptions'), this.get('options'));
  }
});
