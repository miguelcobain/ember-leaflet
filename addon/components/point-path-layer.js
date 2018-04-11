import PathLayer from 'ember-leaflet/components/path-layer';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';

export default PathLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'location'
  ]),

  leafletProperties: Object.freeze([
    'location:setLatLng'
  ]),

  location: toLatLng()
});
