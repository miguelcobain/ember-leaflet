import { moduleForComponent, test } from 'ember-qunit';
import { assertionInjector, assertionCleanup } from '../../assertions';
import Ember from 'ember';
const { run } = Ember;
/* globals L */

let locations = {
  nyc: L.latLng(40.713282, -74.006978),
  sf: L.latLng(37.77493, -122.419415),
  chicago: L.latLng(41.878114, -87.629798),
  paris: L.latLng(48.856614, 2.352222),
  london: L.latLng(51.511214, -0.119824),
  newdelhi: L.latLng(28.635308, 77.22496)
};

moduleForComponent('leaflet-map', 'Unit | Component | leaflet map', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  beforeEach() {
    assertionInjector();
  },
  afterEach() {
    assertionCleanup();
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');
  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('leaflet object should be created', function(assert) {
  var component = this.subject({
    center: locations.nyc,
    zoom: 4
  });
  this.render();

  assert.ok(component._layer);
  assert.ok(component._layer._loaded);
});

test('center and zoom are set on map', function(assert) {
  var component = this.subject({
    center: locations.nyc,
    zoom: 4
  });
  this.render();

  assert.locationsEqual(component._layer.getCenter(), locations.nyc);
  assert.equal(component._layer.getZoom(), 4);
});

test('lat/lng and zoom are set on map', function(assert) {
  var component = this.subject({
    center: locations.nyc,
    zoom: 4
  });
  this.render();

  assert.locationsEqual(component._layer.getCenter(), locations.nyc);
  assert.equal(component._layer.getZoom(), 4);
});

test('zoom changes propagate to the map', function(assert) {
  var component = this.subject({
    center: locations.nyc,
    zoom: 4
  });
  this.render();

  //pre-conditions
  assert.equal(component._layer.getZoom(), 4);

  run(function() {
    component.setProperties({
      zoom: 10
    });
  });

  assert.equal(component._layer.getZoom(), 10);
});

test('center changes propagate to the map', function(assert) {
  assert.expect(2);

  var component = this.subject({
    center: locations.nyc,
    zoom: 18
  });
  this.render();

  //pre-conditions
  assert.locationsEqual(component._layer.getCenter(), locations.nyc);

  run(function() {
    component.setProperties({
      center: locations.chicago
    });
  });

  assert.locationsEqual(component._layer.getCenter(), locations.chicago);
});

test('lat/lng and zoom changes propagate to the map', function(assert) {
  var component = this.subject({
    lat: locations.nyc.lat,
    lng: locations.nyc.lng,
    zoom: 18
  });
  this.render();

  //pre-conditions
  assert.locationsEqual(component._layer.getCenter(), locations.nyc);

  run(function() {
    component.setProperties({
      lat: locations.chicago.lat,
      lng: locations.chicago.lng
    });
  });

  assert.locationsEqual(component._layer.getCenter(), locations.chicago);
});
