import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import GeoJSONLayerComponent from 'ember-leaflet/components/geojson-layer';
import locations from '../../helpers/locations';
import sampleGeoJSON from '../../helpers/sample-geojson';
/* globals L */

const emptyGeoJSON = {
  type: 'FeatureCollection',
  features: []
};

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

  // renders polygon as SVG:
  let polygonPath = this.$('path');

  assert.strictEqual(polygonPath.length, 1);

  // this property should have *something* in it if we've done our job, leave it
  // to Leaflet to test that the GeoJSONLayer populates it correctly
  assert.ok(polygonPath.attr('d'));

  // renders point as marker:
  let markers = geoJSONLayer._layer.getLayers().filter(
    (layer) => layer instanceof L.Marker);

  assert.strictEqual(markers.length, 1);
  assert.locationsEqual(markers[0].getLatLng(), locations.chicago);
});

test('re-render SVG and markers after geoJSON changes', function(assert) {
  // we know this works, as per the above test...
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{geojson-layer geoJSON=sampleGeoJSON}}
    {{/leaflet-map}}
  `);

  // ...now let's force a re-render, clearing all the geoJSON from the map

  // NOTE that it's not enough to modify the geoJSON hash -- we must replace it
  // entirely.
  this.set('sampleGeoJSON', emptyGeoJSON);

  let polygonPath = this.$('path');
  assert.strictEqual(polygonPath.length, 0);

  let markers = geoJSONLayer._layer.getLayers().filter(
    (layer) => layer instanceof L.Marker);
  assert.strictEqual(markers.length, 0);
});

test('make sure geojson is still there on attribute update', function(assert) {
  this.set('color', 'blue');
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{geojson-layer geoJSON=sampleGeoJSON color=color}}
    {{/leaflet-map}}
  `);

  let polygonPath = this.$('path');
  assert.strictEqual(polygonPath.length, 1);

  this.set('color', 'red');

  polygonPath = this.$('path');
  assert.strictEqual(polygonPath.length, 1);
});
