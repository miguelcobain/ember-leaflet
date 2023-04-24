import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import PolylineLayerComponent from 'ember-leaflet/components/polyline-layer';
import locations from '../../helpers/locations';

let arrayPath;

// monkey patch `didCreateLayer` method to get a reference to the instance
let oldDidCreateLayer = PolylineLayerComponent.prototype.didCreateLayer;
PolylineLayerComponent.prototype.didCreateLayer = function () {
  arrayPath = this;
  return oldDidCreateLayer.apply(this, arguments);
};

module('Integration | Component | array path layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('replace locations updates array path layer', async function (assert) {
    this.set('locations', [locations.chicago, locations.nyc, locations.sf]);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.polyline @locations={{this.locations}}/>
      </LeafletMap>
    `);

    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);
    assert.locationsEqual(layerLatLngs[2], locations.sf);

    this.set('locations', [locations.paris, locations.london, locations.newdelhi]);
    await settled();

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.paris);
    assert.locationsEqual(layerLatLngs[1], locations.london);
    assert.locationsEqual(layerLatLngs[2], locations.newdelhi);
  });

  test('adding to locations updates array path layer', async function (assert) {
    this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.polyline @locations={{this.locations}}/>
      </LeafletMap>
    `);
    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);
    assert.locationsEqual(layerLatLngs[2], locations.sf);

    this.locations.pushObject(locations.paris);
    await settled();

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);
    assert.locationsEqual(layerLatLngs[2], locations.sf);
    assert.locationsEqual(layerLatLngs[3], locations.paris);
  });

  test('removing from locations updates array path layer', async function (assert) {
    this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.polyline @locations={{this.locations}}/>
      </LeafletMap>
    `);
    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);
    assert.locationsEqual(layerLatLngs[2], locations.sf);

    this.locations.popObject();
    await settled();

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);
    assert.strictEqual(layerLatLngs.length, 2);
  });

  test('replace item in content moves polyline', async function (assert) {
    this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.polyline @locations={{this.locations}}/>
      </LeafletMap>
    `);

    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);
    assert.locationsEqual(layerLatLngs[2], locations.sf);

    this.locations.replace(1, 1, [locations.paris]);
    await settled();

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.paris);
    assert.locationsEqual(layerLatLngs[2], locations.sf);
    assert.strictEqual(layerLatLngs.length, 3);
  });

  test('supports array of arrays as well', async function (assert) {
    this.set('locations', [
      [-43.123, 71.123],
      [-43.123, 71.123],
      [-43.123, 71.123]
    ]);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.polyline @locations={{this.locations}}/>
      </LeafletMap>
    `);

    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.ok(layerLatLngs[0].equals([-43.123, 71.123]));
    assert.ok(layerLatLngs[1].equals([-43.123, 71.123]));
    assert.ok(layerLatLngs[2].equals([-43.123, 71.123]));

    this.set('locations', [
      [45.528531, -122.681682],
      [45.53097, -122.661968],
      [45.522752, -122.657979]
    ]);
    await settled();

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.ok(layerLatLngs[0].equals([45.528531, -122.681682]));
    assert.ok(layerLatLngs[1].equals([45.53097, -122.661968]));
    assert.ok(layerLatLngs[2].equals([45.522752, -122.657979]));
  });
});
