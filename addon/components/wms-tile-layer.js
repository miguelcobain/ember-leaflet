import TileLayer from 'ember-leaflet/components/tile-layer';

export default class WmsTileLayer extends TileLayer {
  leafletOptions = [...this.leafletOptions, 'layers', 'styles', 'format', 'transparent', 'version', 'crs'];

  createLayer() {
    return this.L.tileLayer.wms(...this.requiredOptions, this.options);
  }
}
