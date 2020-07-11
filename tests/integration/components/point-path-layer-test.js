import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import hbs from 'htmlbars-inline-precompile';

import CircleLayer from 'ember-leaflet/components/circle-layer';

import locations from '../../helpers/locations';

let pointPath;

module('Integration | Component | point path layer', function(hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function() {
    this.owner.register(
      'component:circle-layer',
      class extends CircleLayer {
        constructor() {
          super(...arguments);
          pointPath = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
    this.set('radius', 50);
  });

  test('update point path layer using leafletDescriptors', async function(assert) {
    this.set('location', locations.chicago);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.circle @location={{this.location}} @radius={{this.radius}}/>
      </LeafletMap>
    `);

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.chicago);

    this.set('location', locations.london);

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.london);
  });

  test('lat/lng changes propagate to the point path layer', async function(assert) {
    this.setProperties({
      lat: locations.nyc.lat,
      lng: locations.nyc.lng
    });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.circle @lat={{this.lat}} @lng={{this.lng}} @radius={{this.radius}}/>
      </LeafletMap>
    `);

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.nyc);

    this.setProperties({
      lat: locations.london.lat,
      lng: locations.london.lng
    });

    assert.locationsEqual(pointPath._layer.getLatLng(), locations.london);
  });
});
