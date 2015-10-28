import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import CircleLayerComponent from 'ember-leaflet/components/circle-layer';
/* global L */

let locations = {
  nyc: L.latLng(40.713282, -74.006978),
  sf: L.latLng(37.77493, -122.419415),
  chicago: L.latLng(41.878114, -87.629798),
  paris: L.latLng(48.856614, 2.352222),
  london: L.latLng(51.511214, -0.119824),
  newdelhi: L.latLng(28.635308, 77.22496)
};

let circle;

moduleForComponent('circle-layer', 'Integration | Component | circle layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:circle-layer', CircleLayerComponent.extend({
      init() {
        this._super(...arguments);
        circle = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('update circle layer using leafletProperties', function(assert) {
  this.set('circleCenter', locations.nyc);
  this.set('radius', 25);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{circle-layer location=circleCenter radius=radius}}
    {{/leaflet-map}}
  `);

  assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);
  assert.equal(circle._layer.getRadius(), 25);

  this.set('circleCenter', locations.chicago);
  this.set('radius', 14);

  assert.locationsEqual(circle._layer.getLatLng(), locations.chicago);
  assert.equal(circle._layer.getRadius(), 14);
});

test('lat/lng changes propagate to the circle layer', function(assert) {

  this.setProperties({
    lat: locations.nyc.lat,
    lng: locations.nyc.lng
  });

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{circle-layer lat=lat lng=lng radius=radius}}
    {{/leaflet-map}}
  `);

  assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);

  this.setProperties({
    lat: locations.chicago.lat,
    lng: locations.chicago.lng
  });

  assert.locationsEqual(circle._layer.getLatLng(), locations.chicago);
});
