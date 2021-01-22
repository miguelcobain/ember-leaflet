import BaseLayer from 'ember-leaflet/components/base-layer';

export default class TileLayer extends BaseLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'url'];

  leafletOptions = [
    ...this.leafletOptions,
    'minZoom',
    'maxZoom',
    'maxNativeZoom',
    'tileSize',
    'subdomains',
    'errorTileUrl',
    'attribution',
    'tms',
    'continuousWorld',
    'noWrap',
    'zoomOffset',
    'zoomReverse',
    'opacity',
    'zIndex',
    'unloadInvisibleTiles',
    'updateWhenIdle',
    'detectRetina',
    'reuseTiles',
    'bounds',
    'className',
    'crossOrigin'
  ];

  leafletEvents = [...this.leafletEvents, 'loading', 'load', 'tileloadstart', 'tileload', 'tileunload'];

  leafletDescriptors = [...this.leafletDescriptors, 'url:setUrl:noRedraw', 'zIndex', 'opacity'];

  createLayer() {
    return this.L.tileLayer(...this.requiredOptions, this.options);
  }
}
