import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import CircleLayerComponent from 'ember-leaflet/components/circle-layer';
import locations from '../../helpers/locations';

let pointPath;

// monkey patch `didCreateLayer` method to get a reference to the instance
let oldDidCreateLayer = CircleLayerComponent.prototype.didCreateLayer;
CircleLayerComponent.prototype.didCreateLayer = function () {
  pointPath = this;
  return oldDidCreateLayer.apply(this, arguments);
};

module('Integration | Component | point path layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('center', locations.nyc);
    this.set('zoom', 13);
    this.set('radius', 50);
  });

  test('update point path layer using leafletProperties', async function (assert) {
    this.set('location', locations.chicago);

    await render(hbs`<LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
  <layers.circle @location={{this.location}} @radius={{this.radius}} />
</LeafletMap>`);

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.chicago);

    this.set('location', locations.london);
    await settled();

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.london);
  });

  test('lat/lng changes propagate to the point path layer', async function (assert) {
    this.setProperties({
      lat: locations.nyc.lat,
      lng: locations.nyc.lng
    });

    await render(hbs`<LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
  <layers.circle @lat={{this.lat}} @lng={{this.lng}} @radius={{this.radius}} />
</LeafletMap>`);

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.nyc);

    this.setProperties({
      lat: locations.london.lat,
      lng: locations.london.lng
    });
    await settled();

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.london);
  });
});
