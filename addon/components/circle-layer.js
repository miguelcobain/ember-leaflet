import PointPathLayer from 'ember-leaflet/components/point-path-layer';

export default class CircleLayer extends PointPathLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'radius'];

  leafletDescriptors = [...this.leafletDescriptors, 'radius'];

  createLayer() {
    return this.L.circle(...this.requiredOptions, this.options);
  }
}
