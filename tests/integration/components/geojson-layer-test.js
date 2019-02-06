import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertionInjector,
  assertionCleanup
} from '../../assertions';
import GeoJSONLayerComponent from 'ember-leaflet/components/geojson-layer';
import locations from '../../helpers/locations';
import sampleGeoJSON from '../../helpers/sample-geojson';
/* globals L */

const emptyGeoJSON = {
  type: 'FeatureCollection',
  features: []
};

let geoJSONLayer;

module('Integration | Component | geojson layer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    assertionInjector();

    this.owner.register('component:geojson-layer', GeoJSONLayerComponent.extend({
      init() {
        this._super(...arguments);
        geoJSONLayer = this;
      }
    }));

    this.set('center', locations.chicago);
    this.set('zoom', 14);

    this.set('sampleGeoJSON', sampleGeoJSON);
  });

  hooks.afterEach(function() {
    assertionCleanup();
  });

  test('render geoJSON as SVG and Markers', async function(assert) {
    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{geojson-layer geoJSON=sampleGeoJSON}}
      {{/leaflet-map}}
    `);

    // renders polygon as SVG:
    assert.dom('path').exists({ count: 1 });

    // this property should have *something* in it if we've done our job, leave it
    // to Leaflet to test that the GeoJSONLayer populates it correctly
    assert.dom('path').hasAttribute('d');


    // renders point as marker:
    let markers = geoJSONLayer._layer.getLayers().filter(
      (layer) => layer instanceof L.Marker);

    assert.strictEqual(markers.length, 1);
    assert.locationsEqual(markers[0].getLatLng(), locations.chicago);
  });

  test('re-render SVG and markers after geoJSON changes', async function(assert) {
    // we know this works, as per the above test...
    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{geojson-layer geoJSON=sampleGeoJSON}}
      {{/leaflet-map}}
    `);

    // ...now let's force a re-render, clearing all the geoJSON from the map

    // NOTE that it's not enough to modify the geoJSON hash -- we must replace it
    // entirely.
    this.set('sampleGeoJSON', emptyGeoJSON);

    assert.dom('path').doesNotExist();

    let markers = geoJSONLayer._layer.getLayers().filter(
      (layer) => layer instanceof L.Marker);
    assert.strictEqual(markers.length, 0);
  });

  test('make sure geojson is still there on attribute update', async function(assert) {
    this.set('color', 'blue');
    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{geojson-layer geoJSON=sampleGeoJSON color=color}}
      {{/leaflet-map}}
    `);

    assert.dom('path').exists({ count: 1 });

    this.set('color', 'red');

    assert.dom('path').exists({ count: 1 });
  });
});
