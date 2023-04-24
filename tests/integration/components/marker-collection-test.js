import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import locations from '../../helpers/locations';
/* global L */

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let createLayersCount,
  destroyLayersCount,
  markers = [];

// monkey patch `didCreateLayer` and `willDestroyParent` methods to keep references updated
let oldDidCreateLayer = MarkerLayerComponent.prototype.didCreateLayer;
MarkerLayerComponent.prototype.didCreateLayer = function () {
  createLayersCount++;
  markers.push(this);
  return oldDidCreateLayer.apply(this, arguments);
};

let oldWillDestroyLayer = MarkerLayerComponent.prototype.willDestroyLayer;
MarkerLayerComponent.prototype.willDestroyLayer = function () {
  destroyLayersCount++;
  return oldWillDestroyLayer.apply(this, arguments);
};

module('Integration | Component | marker layer collection', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    createLayersCount = 0;
    destroyLayersCount = 0;
    markers = [];

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  let restaurant1 = { location: locations.nyc };
  let restaurant2 = { location: locations.chicago };
  let restaurant3 = { location: locations.sf };
  let restaurant4 = { location: locations.london };
  let restaurant5 = { location: locations.paris };

  test('layers works within each', async function (assert) {
    this.set('markers', [restaurant1, restaurant2, restaurant3, restaurant4]);

    await render(hbs`<LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
  {{#each this.markers as |m|}}
    <layers.marker @location={{m.location}} />
  {{/each}}
</LeafletMap>`);

    // pre-conditions
    assert.strictEqual(createLayersCount, 4);
    assert.strictEqual(destroyLayersCount, 0);

    this.set('markers', [
      restaurant1,
      restaurant5, // only one item has changed, in a new
      restaurant3,
      restaurant4
    ]);

    // only one leaflet marker was created
    // great for performance
    assert.strictEqual(createLayersCount, 5);
    assert.strictEqual(destroyLayersCount, 1); // and only one was destroyed
  });

  test('popup remains open when another layer is destroyed', async function (assert) {
    this.set('markers', [restaurant1, restaurant2, restaurant3, restaurant4]);

    await render(hbs`<LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
  {{#each this.markers as |m|}}
    <layers.marker @location={{m.location}} as |marker|>
      <marker.popup>
        Popup content
      </marker.popup>
    </layers.marker>
  {{/each}}
</LeafletMap>`);

    // pre-conditions
    assert.strictEqual(createLayersCount, 4);
    assert.strictEqual(destroyLayersCount, 0);

    assert.strictEqual(markers[2]._layer._popup._map, undefined, 'popup not added until opened');

    run(() => {
      markers[2]._layer.fire('click', { latlng: locations.nyc });
    });

    await settled();

    assert.ok(!!markers[2]._layer._popup._map, 'marker added to map');
    assert.dom(markers[2]._layer._popup._contentNode).hasText('Popup content', 'popup content set');

    this.set('markers', [restaurant1, restaurant2, restaurant3]);

    assert.strictEqual(createLayersCount, 4);
    assert.strictEqual(destroyLayersCount, 1);

    assert.ok(!!markers[2]._layer._popup._map, 'marker added to map');
    assert.dom(markers[2]._layer._popup._contentNode).hasText('Popup content', 'popup content set');
  });
});
