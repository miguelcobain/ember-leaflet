import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
/* global L */

let locations = {
  nyc: L.latLng(40.713282, -74.006978),
  sf: L.latLng(37.77493, -122.419415),
  chicago: L.latLng(41.878114, -87.629798),
  paris: L.latLng(48.856614, 2.352222),
  london: L.latLng(51.511214, -0.119824),
  newdelhi: L.latLng(28.635308, 77.22496)
};

moduleForComponent('leaflet-map', 'Integration | Component | leaflet map', {
  integration: true
});

test('map sends actions for events', function(assert) {
  assert.expect(2);

  this.set('moveAction', () => {
    assert.ok(true, 'onMovestart fired');
  });

  this.set('zoomAction', () => {
    assert.ok(true, 'onZoomchanged fired');
  });

  this.set('center', locations.nyc);
  this.set('zoom', 13);

  this.render(hbs`{{leaflet-map zoom=zoom center=center
    onMovestart=(action moveAction) onZoomchanged=(action zoomAction)}}`);

  this.set('center', locations.paris);
  this.set('zoom', 14);
});
