import TileLayer from 'ember-leaflet/components/tile-layer';

export default TileLayer.extend({

  leafletOptions: [
    'layers', 'styles', 'format', 'transparent', 'version', 'crs'
  ],

  createLayer() {
    return this.L.tileLayer.wms(...this.get('requiredOptions'), this.get('options'));
  }

});
