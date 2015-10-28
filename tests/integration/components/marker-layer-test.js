import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
/* global L */

let locations = {
  nyc: L.latLng(40.713282, -74.006978),
  sf: L.latLng(37.77493, -122.419415),
  chicago: L.latLng(41.878114, -87.629798),
  paris: L.latLng(48.856614, 2.352222),
  london: L.latLng(51.511214, -0.119824),
  newdelhi: L.latLng(28.635308, 77.22496)
};

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker;

moduleForComponent('marker-layer', 'Integration | Component | marker layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        marker = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('update marker layer using leafletProperties', function(assert) {
  this.set('markerCenter', locations.nyc);
  this.set('opacity', 0.2);
  this.set('zIndexOffset', 13);
  this.set('icon', L.divIcon({className: 'my-div-icon'}));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter opacity=opacity zIndexOffset=zIndexOffset icon=icon}}
    {{/leaflet-map}}
  `);

  //pre-conditions
  assert.locationsEqual(marker._layer.getLatLng(), locations.nyc);
  assert.equal(marker._layer.options.opacity, 0.2);
  assert.equal(marker._layer.options.zIndexOffset, 13);
  assert.equal(marker._layer.options.icon, this.get('icon'));

  this.set('markerCenter', locations.sf);
  this.set('opacity', 0.8);
  this.set('zIndexOffset', 2);
  this.set('icon', L.divIcon({className: 'another-div-icon'}));

  assert.locationsEqual(marker._layer.getLatLng(), locations.sf);
  assert.equal(marker._layer.options.opacity, 0.8);
  assert.equal(marker._layer.options.zIndexOffset, 2);
  assert.equal(marker._layer.options.icon, this.get('icon'));
});

test('marker sends actions for events', function(assert) {
  assert.expect(1);

  this.set('moveAction', () => {
    assert.ok(true, 'move fired');
  });

  this.set('markerCenter', locations.nyc);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter onMove=(action moveAction)}}
    {{/leaflet-map}}
  `);

  this.set('markerCenter', locations.paris);
});

test('marker is created with enabled dragging', function(assert) {

  this.set('markerCenter', locations.nyc);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter draggable=true}}
    {{/leaflet-map}}
  `);

   assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');
});

test('marker updates dragging', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('draggable', true);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter draggable=draggable}}
    {{/leaflet-map}}
  `);

    //pre-conditions
   assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');

   this.set('draggable', false);

   assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging disabled');
});
