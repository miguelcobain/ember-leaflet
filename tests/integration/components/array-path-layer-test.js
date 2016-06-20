import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import ArrayPathLayerComponent from 'ember-leaflet/components/array-path-layer';
import locations from '../../helpers/locations';

let arrayPath;

moduleForComponent('array-path-layer', 'Integration | Component | array path layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:cutom-array-path-layer', ArrayPathLayerComponent.extend({
      init() {
        this._super(...arguments);
        arrayPath = this;
      },
      createLayer() {
        return this.L.polyline(...this.get('requiredOptions'), this.get('options'));
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('replace locations updates array path layer', function(assert) {
  this.set('locations', [locations.chicago, locations.nyc, locations.sf]);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-array-path-layer locations=locations}}
    {{/leaflet-map}}
  `);
  let layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.nyc);
  assert.locationsEqual(layerLatLngs[2], locations.sf);

  this.set('locations', [locations.paris, locations.london, locations.newdelhi]);

  layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.paris);
  assert.locationsEqual(layerLatLngs[1], locations.london);
  assert.locationsEqual(layerLatLngs[2], locations.newdelhi);
});

test('adding to locations updates array path layer', function(assert) {
  this.set('locations', Ember.A([locations.chicago, locations.nyc, locations.sf]));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-array-path-layer locations=locations}}
    {{/leaflet-map}}
  `);
  let layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.nyc);
  assert.locationsEqual(layerLatLngs[2], locations.sf);

  this.get('locations').pushObject(locations.paris);

  layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.nyc);
  assert.locationsEqual(layerLatLngs[2], locations.sf);
  assert.locationsEqual(layerLatLngs[3], locations.paris);
});

test('removing from locations updates array path layer', function(assert) {
  this.set('locations', Ember.A([locations.chicago, locations.nyc, locations.sf]));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-array-path-layer locations=locations}}
    {{/leaflet-map}}
  `);
  let layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.nyc);
  assert.locationsEqual(layerLatLngs[2], locations.sf);

  this.get('locations').popObject();

  layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.nyc);
  assert.equal(layerLatLngs.length, 2);
});

test('replace item in content moves polyline', function(assert) {
  this.set('locations', Ember.A([locations.chicago, locations.nyc, locations.sf]));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-array-path-layer locations=locations}}
    {{/leaflet-map}}
  `);
  let layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.nyc);
  assert.locationsEqual(layerLatLngs[2], locations.sf);

  this.get('locations').replace(1, 1, locations.paris);

  layerLatLngs = arrayPath._layer.getLatLngs();
  assert.locationsEqual(layerLatLngs[0], locations.chicago);
  assert.locationsEqual(layerLatLngs[1], locations.paris);
  assert.locationsEqual(layerLatLngs[2], locations.sf);
  assert.equal(layerLatLngs.length, 3);
});

test('supports array of arrays as well', function(assert) {
  this.set('locations', [[-43.123, 71.123], [-43.123, 71.123], [-43.123, 71.123]]);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{cutom-array-path-layer locations=locations}}
    {{/leaflet-map}}
  `);
  let layerLatLngs = arrayPath._layer.getLatLngs();
  assert.ok(layerLatLngs[0].equals([-43.123, 71.123]));
  assert.ok(layerLatLngs[1].equals([-43.123, 71.123]));
  assert.ok(layerLatLngs[2].equals([-43.123, 71.123]));

  this.set('locations', [[45.528531, -122.681682], [45.530970, -122.661968], [45.522752, -122.657979]]);

  layerLatLngs = arrayPath._layer.getLatLngs();
  assert.ok(layerLatLngs[0].equals([45.528531, -122.681682]));
  assert.ok(layerLatLngs[1].equals([45.530970, -122.661968]));
  assert.ok(layerLatLngs[2].equals([45.522752, -122.657979]));
});
