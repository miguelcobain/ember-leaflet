import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import RectangleLayerComponent from 'ember-leaflet/components/rectangle-layer';
import locations from '../../helpers/locations';

let rectangle;

module('Integration | Component | rectangle layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'component:rectangle-layer',
      class extends RectangleLayerComponent {
        constructor() {
          super(...arguments);
          rectangle = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('update rectangle layer using leafletProperties', async function (assert) {
    this.set('locations', [locations.chicago, locations.nyc]);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.rectangle @locations={{this.locations}}/>
      </LeafletMap>
    `);

    let layerLatLngs = rectangle._layer.getLatLngs(); //returns four corners
    assert.locationsEqual(layerLatLngs[0][1] || layerLatLngs[1], locations.chicago); //top left
    assert.locationsEqual(layerLatLngs[0][3] || layerLatLngs[3], locations.nyc); //bottom right

    this.set('locations', [locations.paris, locations.london]);
    await settled();

    layerLatLngs = rectangle._layer.getLatLngs(); //returns two corners
    assert.locationsEqual(layerLatLngs[0][0] || layerLatLngs[0], locations.paris); //top left
    assert.locationsEqual(layerLatLngs[0][1] || layerLatLngs[1], locations.london); //bottom right
  });

  test('lat/lng changes propagate to the rectangle layer', async function (assert) {
    this.setProperties({
      lat1: locations.nyc.lat,
      lng1: locations.nyc.lng,
      lat2: locations.chicago.lat,
      lng2: locations.chicago.lng
    });

    this.set('locations', [
      [this.lat1, this.lng1],
      [this.lat2, this.lng2]
    ]);
    await settled();

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.rectangle @locations={{this.locations}}/>
      </LeafletMap>
    `);

    let layerLatLngs = rectangle._layer.getLatLngs(); //returns 4 corners
    assert.locationsEqual(layerLatLngs[0][3] || layerLatLngs[3], locations.nyc); //bottom right
    assert.locationsEqual(layerLatLngs[0][1] || layerLatLngs[1], locations.chicago); //top left

    this.setProperties({
      lat1: locations.paris.lat,
      lng1: locations.paris.lng,
      lat2: locations.london.lat,
      lng2: locations.london.lng
    });

    this.set('locations', [
      [this.lat1, this.lng1],
      [this.lat2, this.lng2]
    ]);
    await settled();

    layerLatLngs = rectangle._layer.getLatLngs(); //returns only two corners
    assert.locationsEqual(layerLatLngs[0][0] || layerLatLngs[0], locations.paris); //top left
    assert.locationsEqual(layerLatLngs[0][1] || layerLatLngs[1], locations.london); //bottom right
  });
});
