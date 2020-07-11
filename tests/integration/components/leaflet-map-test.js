import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test, skip } from 'qunit';

import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import hbs from 'htmlbars-inline-precompile';

import LeafletMap from 'ember-leaflet/components/leaflet-map';

import locations from '../../helpers/locations';
/* global L */

let map;

module('Integration | Component | leaflet map', function(hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function() {
    this.owner.register(
      'component:leaflet-map',
      class extends LeafletMap {
        constructor() {
          super(...arguments);
          map = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 12);
  });

  test('update map layer using leafletDescriptors (zoom and center)', async function(assert) {
    this.set('zoomPanOptions', {
      animate: false
    });
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} @zoomPanOptions={{this.zoomPanOptions}}/>
    `);

    assert.locationsEqual(map._layer.getCenter(), locations.nyc);
    assert.equal(map._layer.getZoom(), 12);

    this.set('center', locations.chicago);
    this.set('zoom', 14);

    assert.locationsEqual(map._layer.getCenter(), locations.chicago);
    assert.equal(map._layer.getZoom(), 14);
  });

  test('lat/lng changes propagate to the map', async function(assert) {
    this.setProperties({
      lat: locations.nyc.lat,
      lng: locations.nyc.lng
    });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @lat={{this.lat}} @lng={{this.lng}}/>
    `);

    assert.locationsEqual(map._layer.getCenter(), locations.nyc);

    this.setProperties({
      lat: locations.chicago.lat,
      lng: locations.chicago.lng
    });

    assert.locationsEqual(map._layer.getCenter(), locations.chicago);
  });

  test('update map layer using leafletDescriptors (bounds)', async function(assert) {
    this.set('fitBoundsOptions', {
      animate: false
    });
    this.set('bounds', [locations.nyc, locations.chicago]);

    await render(hbs`
      <LeafletMap @bounds={{this.bounds}} @fitBoundsOptions={{this.fitBoundsOptions}}/>
    `);

    assert.boundsContain(map._layer.getBounds(), [locations.nyc, locations.chicago]);

    this.set('bounds', [locations.nyc, locations.sf]);

    assert.boundsContain(map._layer.getBounds(), [locations.nyc, locations.sf]);
  });

  test('update map layer using leafletDescriptors (bounds and then center)', async function(assert) {
    this.set('bounds2', [locations.nyc, locations.sf]);

    await render(hbs`
      <LeafletMap @center={{this.center2}} @bounds={{this.bounds2}} @zoom={{this.zoom2}}/>
    `);

    assert.boundsContain(map._layer.getBounds(), [locations.nyc, locations.sf]);

    this.set('zoom2', 12);
    this.set('center2', locations.nyc);

    assert.locationsEqual(map._layer.getCenter(), locations.nyc);
  });

  test('update map layer using leafletDescriptors (bounds and fitBoundsOptions)', async function(assert) {
    this.set('fitBoundsOptions', null);
    this.set('bounds', [locations.nyc, locations.chicago]);

    await render(hbs`
      <LeafletMap @bounds={{this.bounds}} @fitBoundsOptions={{this.fitBoundsOptions}}/>
    `);

    let pixelBounds = map._layer.getPixelBounds();

    this.set('fitBoundsOptions', { padding: [150, 150] });
    this.set('bounds', [locations.chicago, locations.nyc]);
    let pixelBoundsWithOptions = map._layer.getPixelBounds();

    assert.notEqual(pixelBounds.min.x, pixelBoundsWithOptions.min.x);
    assert.notEqual(pixelBounds.min.y, pixelBoundsWithOptions.min.y);
  });

  test('map sends actions for events', async function(assert) {
    assert.expect(5);

    this.set('moveAction', () => {
      assert.ok(true, 'onMovestart fired');
    });

    this.set('zoomAction', () => {
      assert.ok(true, 'onZoomchanged fired');
    });

    // enabling zoom animation leads to an error, probably because the
    // animation end event occurs after the component is destroyed?
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} @zoomAnimation={{false}}
        @onMovestart={{action this.moveAction}} @onZoomstart={{action this.zoomAction}}/>
    `);

    // This runs 5 actions because:
    // 1. initial movestart
    // 2. initial zoomstart
    // 3. second movestart because of a center change
    // 4. second zoomstart because of a zoom change
    // 5. third movestart because of a zoom change (a zoom also sightly moves the map)

    this.setProperties({
      center: locations.paris,
      zoom: 14
    });
  });

  // Some kinds of events required us to delay
  // `setView` after binding the observers.
  // This test ensures those kind of events still run
  test('map sends actions for events load and initial viewreset', async function(assert) {
    assert.expect(2);

    this.set('loadAction', () => {
      assert.ok(true, 'onLoad fired');
    });

    this.set('viewResetAction', () => {
      assert.ok(true, 'onViewreset fired');
    });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}}
        @onLoad={{action this.loadAction}} @onViewreset={{action this.viewResetAction}}/>
    `);
  });

  skip('map throws if bounds, center and zoom are provided', function(assert) {
    assert.expect(1);

    assert.throws(async () => {
      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}} @bounds={{2}}/>
      `);
    }, 'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.');
  });

  skip('map throws if only center is provided', function(assert) {
    assert.expect(1);

    assert.throws(async () => {
      await render(hbs`
        <LeafletMap @center={{this.center}}/>
      `);
    }, 'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.');
  });

  skip('map throws if only zoom is provided', function(assert) {
    assert.expect(1);

    assert.throws(async () => {
      await render(hbs`
        <LeafletMap @zoom={{this.zoom}}/>
      `);
    }, 'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.');
  });

  test('setting zoom to 0 should not throw', async function(assert) {
    await render(hbs`
      <LeafletMap @zoom={{0}} @center={{this.center}}/>
    `);

    assert.equal(map._layer.getZoom(), 0, 'zoom 0 is set');
  });

  test('using bounds from lat-lng-bounds helper works', async function(assert) {
    this.set('markerCenter', locations.nyc);
    this.set('bounds', locations.bounds());

    await render(hbs`
      <LeafletMap @bounds={{lat-lng-bounds bounds}} as |layers|>
        <layers.marker @location={{this.markerCenter}}/>
      </LeafletMap>
    `);

    assert.ok(map._layer.getBounds() instanceof L.LatLngBounds);
    assert.boundsContain(map._layer.getBounds(), locations.bounds());
  });
});
