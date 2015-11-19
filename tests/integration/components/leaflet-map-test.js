import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import LeafletMapComponent from 'ember-leaflet/components/leaflet-map';
import locations from '../../helpers/locations';

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
