import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import GeoJSONLayerComponent from 'ember-leaflet/components/geojson-layer';
import locations from '../../helpers/locations';
import sampleGeoJSON from '../../helpers/sample-geojson';
/* globals L */

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let geoJSONLayer;

moduleForComponent('geojson-layer', 'Integration | Component | geojson layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:geojson-layer', GeoJSONLayerComponent.extend({
      init() {
        this._super(...arguments);
        geoJSONLayer = this;
      }
    }));

    this.set('center', locations.chicago);
    this.set('zoom', 14);

    this.set('sampleGeoJSON', sampleGeoJSON);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('render geoJSON as SVG and Markers', function(assert) {
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{geojson-layer geoJSON=sampleGeoJSON}}
    {{/leaflet-map}}
  `);

  //renders polygon as SVG:
  const polygonPath = this.$('path');

  assert.strictEqual(polygonPath.length, 1);

  //this property should have *something* in it if we've done our job, leave it
  //to Leaflet to test that the GeoJSONLayer populates it correctly
  assert.ok(polygonPath.attr('d'));

  //renders point as marker:
  const markers = geoJSONLayer._layer.getLayers().filter(
    (layer) => layer instanceof L.Marker);

  assert.strictEqual(markers.length, 1);
  assert.locationsEqual(markers[0].getLatLng(), locations.chicago);
});
