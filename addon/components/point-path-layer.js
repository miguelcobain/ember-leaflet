import PathLayer from 'ember-leaflet/components/path-layer';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';

export default PathLayer.extend({

  leafletRequiredOptions: [
    'location'
  ],

  leafletProperties: [
    'location:setLatLng'
  ],

  location: toLatLng()
});
