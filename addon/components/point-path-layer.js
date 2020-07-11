import PathLayer from 'ember-leaflet/components/path-layer';

export default class PointPathLayer extends PathLayer {
  leafletRequiredOptions = [...this.leafletRequiredOptions, 'location'];

  leafletDescriptors = [...this.leafletDescriptors, 'location:setLatLng'];

  get location() {
    if (this.args.location) {
      return this.args.location;
    } else {
      let [lat, lng] = [this.args.lat, this.args.lng];
      return this.L.latLng(lat, lng);
    }
  }
}
