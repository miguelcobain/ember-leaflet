import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import LeafletMapComponent from 'ember-leaflet/components/leaflet-map';
/* global L */

let locations = {
  nyc: L.latLng(40.713282, -74.006978),
  sf: L.latLng(37.77493, -122.419415),
  chicago: L.latLng(41.878114, -87.629798),
  paris: L.latLng(48.856614, 2.352222),
  london: L.latLng(51.511214, -0.119824),
  newdelhi: L.latLng(28.635308, 77.22496)
};

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
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('update map layer using leafletProperties (zoom and center)', function(assert) {
  this.render(hbs`{{leaflet-map zoom=zoom center=center}}`);

  assert.locationsEqual(map._layer.getCenter(), locations.nyc);
  assert.equal(map._layer.getZoom(), 13);

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

test('map sends actions for events', function(assert) {
  assert.expect(2);

  this.set('moveAction', () => {
    assert.ok(true, 'onMovestart fired');
  });

  this.set('zoomAction', () => {
    assert.ok(true, 'onZoomchanged fired');
  });

  this.render(hbs`{{leaflet-map zoom=zoom center=center
    onMovestart=(action moveAction) onZoomchanged=(action zoomAction)}}`);

  this.set('center', locations.paris);
  this.set('zoom', 14);
});
