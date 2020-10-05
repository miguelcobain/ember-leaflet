import ArrayPathLayer from 'ember-leaflet/components/array-path-layer';

export default class PolylineLayer extends ArrayPathLayer {
  leafletOptions = [...this.leafletOptions, 'smoothFactor', 'noClip'];

  createLayer() {
    return this.L.polyline(...this.requiredOptions, this.options);
  }
}
