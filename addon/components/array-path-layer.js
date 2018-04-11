import PathLayer from 'ember-leaflet/components/path-layer';

export default PathLayer.extend({

  leafletRequiredOptions: Object.freeze([
    'locations'
  ]),

  leafletProperties: Object.freeze([
    'locations.[]:setLatLngs'
  ])
});
