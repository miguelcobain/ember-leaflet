import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import CircleLayerComponent from 'ember-leaflet/components/circle-layer';
import locations from '../../helpers/locations';

let circle;

module('Integration | Component | circle layer', function(hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:circle-layer', CircleLayerComponent.extend({
      init() {
        this._super(...arguments);
        circle = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('update circle layer using leafletProperties', async function(assert) {
    this.set('circleCenter', locations.nyc);
    this.set('radius', 25);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{circle-layer location=circleCenter radius=radius}}
      {{/leaflet-map}}
    `);

    assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);
    assert.equal(circle._layer.getRadius(), 25);

    this.set('circleCenter', locations.london);
    this.set('radius', 14);

    assert.locationsEqual(circle._layer.getLatLng(), locations.london);
    assert.equal(circle._layer.getRadius(), 14);
  });

  test('lat/lng changes propagate to the circle layer', async function(assert) {

    this.setProperties({
      lat: locations.nyc.lat,
      lng: locations.nyc.lng,
      radius: 25
    });

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{circle-layer lat=lat lng=lng radius=radius}}
      {{/leaflet-map}}
    `);

    assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);

    this.setProperties({
      lat: locations.london.lat,
      lng: locations.london.lng
    });

    assert.locationsEqual(circle._layer.getLatLng(), locations.london);
  });
});
