import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import GeoJSONLayerComponent from 'ember-leaflet/components/geojson-layer';
import locations from '../../helpers/locations';
import sampleGeoJSON from '../../helpers/sample-geojson';
import { run } from '@ember/runloop';
/* globals L */

const emptyGeoJSON = {
  type: 'FeatureCollection',
  features: []
};

let geoJSONLayer;

module('Integration | Component | geojson layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'component:geojson-layer',
      class extends GeoJSONLayerComponent {
        constructor() {
          super(...arguments);
          geoJSONLayer = this;
        }
      }
    );

    this.set('center', locations.chicago);
    this.set('zoom', 14);

    this.set('sampleGeoJSON', sampleGeoJSON);
  });

  test('render geoJSON as SVG and Markers', async function (assert) {
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.geojson @geoJSON={{this.sampleGeoJSON}}/>
      </LeafletMap>
    `);

    // renders polygon as SVG:
    assert.dom('path').exists({ count: 1 });

    // this property should have *something* in it if we've done our job, leave it
    // to Leaflet to test that the GeoJSONLayer populates it correctly
    assert.dom('path').hasAttribute('d');

    // renders point as marker:
    let markers = geoJSONLayer._layer.getLayers().filter(layer => layer instanceof L.Marker);

    assert.strictEqual(markers.length, 1);
    assert.locationsEqual(markers[0].getLatLng(), locations.chicago);
  });

  test('re-render SVG and markers after geoJSON changes', async function (assert) {
    // we know this works, as per the above test...
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.geojson @geoJSON={{this.sampleGeoJSON}}/>
      </LeafletMap>
    `);

    // ...now let's force a re-render, clearing all the geoJSON from the map

    // NOTE that it's not enough to modify the geoJSON hash -- we must replace it
    // entirely.
    this.set('sampleGeoJSON', emptyGeoJSON);

    assert.dom('path').doesNotExist();

    let markers = geoJSONLayer._layer.getLayers().filter(layer => layer instanceof L.Marker);
    assert.strictEqual(markers.length, 0);
  });

  test('make sure geojson is still there on attribute update', async function (assert) {
    this.style = () => ({ color: 'blue' });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.geojson @geoJSON={{this.sampleGeoJSON}} @style={{this.styleBlue}}/>
      </LeafletMap>
    `);

    assert.dom('path').exists({ count: 1 });

    this.set('style', () => ({ color: 'red' }));

    assert.dom('path').exists({ count: 1 });
  });

  test('update color on event', async function (assert) {
    this.onEachFeature = (feature, layer) => {
      layer.addEventListener('mouseover', () => {
        layer.setStyle?.({ color: 'red', fillColor: 'red' });
      });

      layer.addEventListener('mouseout', () => {
        layer?.setStyle?.({ color: 'blue', fillColor: 'blue' });
      });
    };

    this.style = () => ({ color: 'green', fillColor: 'green' });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.geojson
          @geoJSON={{this.sampleGeoJSON}}
          @style={{this.style}}
          @onEachFeature={{this.onEachFeature}}/>
      </LeafletMap>
    `);

    assert.dom('path').exists({ count: 1 });
    assert.dom('path').hasAttribute('stroke', 'green', 'Original stroke set');
    assert.dom('path').hasAttribute('fill', 'green', 'Original fill set');

    run(() => {
      for (let [, layer] of Object.entries(geoJSONLayer._layer._layers)) {
        layer.fire('mouseover');
      }
    });
    await settled();

    assert.dom('path').hasAttribute('stroke', 'red', 'Mouseover stroke set');
    assert.dom('path').hasAttribute('fill', 'red', 'Mouseover fill set');

    run(() => {
      for (let [, layer] of Object.entries(geoJSONLayer._layer._layers)) {
        layer.fire('mouseout');
      }
    });
    await settled();

    assert.dom('path').hasAttribute('stroke', 'blue', 'Mouseleave stroke set');
    assert.dom('path').hasAttribute('fill', 'blue', 'Mouseleave fill set');
  });

  test('update color on style function change', async function (assert) {
    this.style = function () {
      return { color: 'green', fillColor: 'green' };
    };

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.geojson @geoJSON={{this.sampleGeoJSON}} @style={{this.style}}/>
      </LeafletMap>
    `);

    assert.dom('path').exists({ count: 1 });
    assert.dom('path').hasAttribute('stroke', 'green', 'Original stroke set');
    assert.dom('path').hasAttribute('fill', 'green', 'Original fill set');

    this.set('style', function () {
      return { color: 'red', fillColor: 'red' };
    });

    assert.dom('path').hasAttribute('stroke', 'red', 'Mouseover stroke set');
    assert.dom('path').hasAttribute('fill', 'red', 'Mouseover fill set');

    this.set('style', function () {
      return { color: 'blue', fillColor: 'blue' };
    });

    assert.dom('path').hasAttribute('stroke', 'blue', 'Mouseleave stroke set');
    assert.dom('path').hasAttribute('fill', 'blue', 'Mouseleave fill set');
  });
});
