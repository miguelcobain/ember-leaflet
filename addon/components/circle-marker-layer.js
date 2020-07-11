import PointPathLayer from 'ember-leaflet/components/point-path-layer';

export default class CircleMarkerLayer extends PointPathLayer {
  leafletOptions = [...this.leafletOptions, 'radius'];

  leafletDescriptors = [...this.leafletDescriptors, 'radius'];

  createLayer() {
    return this.L.circleMarker(...this.requiredOptions, this.options);
  }
}
