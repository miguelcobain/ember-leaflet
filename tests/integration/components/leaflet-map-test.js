import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import LeafletMapComponent from 'ember-leaflet/components/leaflet-map';
import locations from '../../helpers/locations';
/* global L */

let map;

moduleForComponent('leaflet-map', 'Integration | Component | leaflet map', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:leaflet-map', LeafletMapComponent.extend({
      init() {
        this._super(...arguments);
        map = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 12);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('update map layer using leafletProperties (zoom and center)', function(assert) {
  this.render(hbs`{{leaflet-map zoom=zoom center=center}}`);

  assert.locationsEqual(map._layer.getCenter(), locations.nyc);
  assert.equal(map._layer.getZoom(), 12);

  this.set('center', locations.chicago);
  this.set('zoom', 14);

  assert.locationsEqual(map._layer.getCenter(), locations.chicago);
  assert.equal(map._layer.getZoom(), 14);
});

test('lat/lng changes propagate to the map', function(assert) {

  this.setProperties({
    lat: locations.nyc.lat,
    lng: locations.nyc.lng
  });

  this.render(hbs`{{leaflet-map zoom=zoom lat=lat lng=lng}}`);

  assert.locationsEqual(map._layer.getCenter(), locations.nyc);

  this.setProperties({
    lat: locations.chicago.lat,
    lng: locations.chicago.lng
  });

  assert.locationsEqual(map._layer.getCenter(), locations.chicago);
});

test('update map layer using leafletProperties (bounds)', function(assert) {
  this.set('bounds', [locations.nyc, locations.chicago]);

  this.render(hbs`{{leaflet-map bounds=bounds}}`);

  assert.boundsContain(map._layer.getBounds(), [locations.nyc, locations.chicago]);

  this.set('bounds', [locations.nyc, locations.sf]);

  assert.boundsContain(map._layer.getBounds(), [locations.nyc, locations.sf]);
});

test('update map layer using leafletProperties (bounds and then center)', function(assert) {
  this.set('bounds2', [locations.nyc, locations.sf]);

  this.render(hbs`{{leaflet-map center=center2 bounds=bounds2 zoom=zoom2}}`);

  assert.boundsContain(map._layer.getBounds(), [locations.nyc, locations.sf]);

  this.set('zoom2', 12);
  this.set('center2', locations.nyc);

  assert.locationsEqual(map._layer.getCenter(), locations.nyc);
});

test('update map layer using leafletProperties (bounds and fitBoundsOptions)', function(assert) {
  this.set('fitBoundsOptions', null);
  this.set('bounds', [locations.nyc, locations.chicago]);
  this.render(hbs`{{leaflet-map bounds=bounds fitBoundsOptions=fitBoundsOptions}}`);
  let pixelBounds = map._layer.getPixelBounds();

  this.set('fitBoundsOptions', {padding: [500, 500]});
  this.set('bounds', [locations.chicago, locations.nyc]);
  let pixelBoundsWithOptions = map._layer.getPixelBounds();

  assert.notEqual(pixelBounds.min.x, pixelBoundsWithOptions.min.x);
  assert.notEqual(pixelBounds.min.y, pixelBoundsWithOptions.min.y);
});

test('map sends actions for events', function(assert) {
  assert.expect(5);

  this.set('moveAction', () => {
    assert.ok(true, 'onMovestart fired');
  });

  this.set('zoomAction', () => {
    assert.ok(true, 'onZoomchanged fired');
  });

  this.render(hbs`{{leaflet-map zoom=zoom center=center
    onMovestart=(action moveAction) onZoomstart=(action zoomAction)}}`);

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
test('map sends actions for events load and initial viewreset', function(assert) {
  assert.expect(2);

  this.set('loadAction', () => {
    assert.ok(true, 'onLoad fired');
  });

  this.set('viewResetAction', () => {
    assert.ok(true, 'onViewreset fired');
  });

  this.render(hbs`{{leaflet-map zoom=zoom center=center
    onLoad=(action loadAction) onViewreset=(action viewResetAction)}}`);

});

test('map throws if bounds, center and zoom are provided', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{leaflet-map zoom=zoom center=center bounds=2}}`);
  }, 'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.');
});

test('map throws if only center is provided', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{leaflet-map center=center}}`);
  }, 'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.');
});

test('map throws if only zoom is provided', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{leaflet-map zoom=zoom}}`);
  }, 'You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.');
});

test('setting zoom to 0 should not throw', function(assert) {
  this.render(hbs`{{leaflet-map zoom=0 center=center}}`);

  assert.equal(map._layer.getZoom(), 0, 'zoom 0 is set');
});

test('using bounds from lat-lng-bounds helper works', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('bounds', locations.bounds());

  this.render(hbs`
    {{#leaflet-map bounds=(lat-lng-bounds bounds)}}
      {{marker-layer location=markerCenter}}
    {{/leaflet-map}}
  `);

  assert.ok(map._layer.getBounds() instanceof L.LatLngBounds);
  assert.boundsContain(map._layer.getBounds(), locations.bounds());
});
