import PathLayer from 'ember-leaflet/components/path-layer';

export default class ArrayPathLayer extends PathLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'locations'];

  leafletDescriptors = [...this.leafletDescriptors, 'locations:setLatLngs'];
}
