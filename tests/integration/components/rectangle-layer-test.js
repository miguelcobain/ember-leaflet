import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import RectangleLayerComponent from 'ember-leaflet/components/rectangle-layer';
import locations from '../../helpers/locations';

let rectangle;

module('Integration | Component | rectangle layer', function(hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:rectangle-layer', RectangleLayerComponent.extend({
      init() {
        this._super(...arguments);
        rectangle = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });
  
  test('update rectangle layer using leafletProperties', async function(assert) {
    this.set('bounds', [locations.chicago, locations.nyc]);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{rectangle-layer bounds=bounds}}
      {{/leaflet-map}}
    `);

    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.chicago);
    assert.locationsEqual(layerLatLngs[1], locations.nyc);

    this.set('bounds', [locations.paris, locations.london]);

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.paris);
    assert.locationsEqual(layerLatLngs[1], locations.london);
  });

  test('lat/lng changes propagate to the rectangle layer', async function(assert) {

    this.setProperties({
      lat1: locations.nyc.lat,
      lng1: locations.nyc.lng,
      lat2: locations.chicago.lat,
      lng2: locations.chicago.lng,
      bounds: [[lat1,lng1],[lat2,lng2]]
    });

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{rectangle-layer bounds=bounds}}
      {{/leaflet-map}}
    `);

    let layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.nyc);
    assert.locationsEqual(layerLatLngs[1], locations.chicago);

    this.setProperties({
      lat1: locations.paris.lat,
      lng1: locations.paris.lng,
      lat2: locations.london.lat,
      lng2: locations.london.lng
    });

    layerLatLngs = arrayPath._layer.getLatLngs();
    assert.locationsEqual(layerLatLngs[0], locations.paris);
    assert.locationsEqual(layerLatLngs[1], locations.london);
  });
});
