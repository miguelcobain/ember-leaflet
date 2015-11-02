import PathLayer from 'ember-leaflet/components/path-layer';

export default PathLayer.extend({

  leafletRequiredOptions: [
    'locations'
  ],

  leafletProperties: [
    'locations.[]:setLatLngs'
  ]
});
