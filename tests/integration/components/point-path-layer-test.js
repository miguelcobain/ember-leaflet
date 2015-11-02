import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import PointPathLayerComponent from 'ember-leaflet/components/point-path-layer';
import locations from '../../helpers/locations';

let pointPath;

moduleForComponent('point-path-layer', 'Integration | Component | point path layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:cutom-point-path-layer', PointPathLayerComponent.extend({
      init() {
        this._super(...arguments);
        pointPath = this;
      },
      createLayer() {
        return this.L.circle(this.get('location'), 50, this.get('options'));
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('update point path layer using leafletProperties', function(assert) {
  this.set('location', locations.chicago);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-point-path-layer location=location}}
    {{/leaflet-map}}
  `);

  assert.locationsEqual(pointPath._layer.getLatLng(), locations.chicago);

  this.set('location', locations.london);

  assert.locationsEqual(pointPath._layer.getLatLng(), locations.london);
});

test('lat/lng changes propagate to the point path layer', function(assert) {

  this.setProperties({
    lat: locations.nyc.lat,
    lng: locations.nyc.lng
  });

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-point-path-layer lat=lat lng=lng}}
    {{/leaflet-map}}
  `);

  assert.locationsEqual(pointPath._layer.getLatLng(), locations.nyc);

  this.setProperties({
    lat: locations.london.lat,
    lng: locations.london.lng
  });

  assert.locationsEqual(pointPath._layer.getLatLng(), locations.london);
});
