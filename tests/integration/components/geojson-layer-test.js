import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import GeoJSONLayerComponent from 'ember-leaflet/components/geojson-layer';
import locations from '../../helpers/locations';
import sampleGeoJSON from '../../helpers/sample-geojson';
import sampleMultiPolygonGeoJSON from '../../helpers/sample-multipolygon-geojson';

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
    this.set('sampleMultiPolygonGeoJSON', sampleMultiPolygonGeoJSON);
    this.set('fill', '#3388ff');
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
});

test('re-render SVG and markers after geoJSON changes', function(assert) {
  //we know this works, as per the above test...
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{geojson-layer geoJSON=sampleGeoJSON}}
    {{/leaflet-map}}
  `);

  //...now let's force a re-render, clearing all the geoJSON from the map

  //NOTE that it's not enough to modify the geoJSON hash -- we must replace it
  //entirely.
  this.set('sampleGeoJSON', emptyGeoJSON);

  const polygonPath = this.$('path');
  assert.strictEqual(polygonPath.length, 0);

});

test('re-render SVG and markers after geoJSON style changes', function(assert) {
  //we know this works, as per the above test...
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{geojson-layer geoJSON=sampleMultiPolygonGeoJSON fill=fill}}
    {{/leaflet-map}}
  `);

  //...now let's force a re-render changing the style

  //NOTE that it's not enough to modify the geoJSON hash -- we must replace it
  //entirely.
  this.set('fill', '#ff0000');

  const polygonPath = this.$('path');
  assert.strictEqual(polygonPath[0].attributes.fill.value, '#ff0000');
});
