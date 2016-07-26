import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import CircleLayerComponent from 'ember-leaflet/components/circle-layer';
import locations from '../../helpers/locations';

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

  this.set('circleCenter', locations.london);
  this.set('radius', 14);

  assert.locationsEqual(circle._layer.getLatLng(), locations.london);
  assert.equal(circle._layer.getRadius(), 14);
});

test('lat/lng changes propagate to the circle layer', function(assert) {

  this.setProperties({
    lat: locations.nyc.lat,
    lng: locations.nyc.lng,
    radius: 25
  });

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{circle-layer lat=lat lng=lng radius=radius}}
    {{/leaflet-map}}
  `);

  assert.locationsEqual(circle._layer.getLatLng(), locations.nyc);

  this.setProperties({
    lat: locations.london.lat,
    lng: locations.london.lng
  });

  assert.locationsEqual(circle._layer.getLatLng(), locations.london);
});


test('popupOptions hash applies to the popup', function(assert) {
  this.set('circleCenter', locations.nyc);
  this.set('popupOptions', { className: 'circle' });
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#circle-layer location=circleCenter radius=5 popupOptions=popupOptions}}
        Circle Content
      {{/circle-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(circle._popup.options.className, 'circle', 'options passed to circle-layer correctly');
});
