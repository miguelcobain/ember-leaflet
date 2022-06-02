import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import CircleLayerComponent from 'ember-leaflet/components/circle-layer';
import locations from '../../helpers/locations';

let circle;

module('Integration | Component | circle layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'component:circle-layer',
      class extends CircleLayerComponent {
        constructor() {
          super(...arguments);
          circle = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('update circle layer using leafletProperties', async function (assert) {
    this.set('circleCenter', locations.nyc);
    this.set('radius', 25);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.circle @location={{this.circleCenter}} @radius={{this.radius}}/>
      </LeafletMap>
    `);

    assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);
    assert.strictEqual(circle._layer.getRadius(), 25);

    this.set('circleCenter', locations.london);
    this.set('radius', 14);
    await settled();

    assert.locationsEqual(circle._layer.getLatLng(), locations.london);
    assert.strictEqual(circle._layer.getRadius(), 14);
  });

  test('lat/lng changes propagate to the circle layer', async function (assert) {
    this.setProperties({
      lat: locations.nyc.lat,
      lng: locations.nyc.lng,
      radius: 25
    });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.circle @lat={{this.lat}} @lng={{this.lng}} @radius={{this.radius}}/>
      </LeafletMap>
    `);

    assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);

    this.setProperties({
      lat: locations.london.lat,
      lng: locations.london.lng
    });
    await settled();

    assert.locationsEqual(circle._layer.getLatLng(), locations.london);
  });
});
