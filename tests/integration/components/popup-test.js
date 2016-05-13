import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import locations from '../../helpers/locations';
const { computed } = Ember;
/* globals L */

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker, layer;

moduleForComponent('marker-layer', 'Integration | Component | popup mixin', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        marker = this;
      },
      createLayer() {
        let leafletLayer = this._super(...arguments);
        layer = leafletLayer;
        return leafletLayer;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('popup works', function(assert) {
  this.set('markerCenter', locations.nyc);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter}}
        Popup content
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._popup._map, null, 'popup not added until opened');

  Ember.run(() => {
    marker._layer.fire('click', { latlng: locations.nyc });
  });

  assert.ok(!!marker._popup._map, 'popup opened');
  assert.equal(Ember.$(marker._popup._contentNode).text().trim(), 'Popup content', 'popup content set');
});

test('popup content isn\'t rendered until it is opened (lazy popups)', function(assert) {
  var didRun = false;

  this.set('markerCenter', locations.nyc);
  this.set('computedProperty', computed(function() {
    didRun = true;
  }));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter}}
        {{computedProperty}}
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._popup._map, null, 'popup not added until opened');

  assert.ok(!didRun, 'computed property did not run');

  Ember.run(() => {
    marker._layer.fire('click', { latlng: locations.nyc });
  });

  assert.ok(!!marker._popup._map, 'popup opened');
  assert.ok(didRun, 'computed property did run');

});

test('popup opens based on popupOpen', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('popupOpen', true);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter popupOpen=popupOpen}}
        Popup content
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.ok(!!marker._popup._map, 'popup starts open');
  assert.equal(Ember.$(marker._popup._contentNode).text().trim(), 'Popup content', 'popup content set');

  Ember.run(() => {
    this.set('popupOpen', false);
  });

  assert.equal(marker._popup._map, null, 'popup closed');

  Ember.run(() => {
    this.set('popupOpen', true);
  });

  assert.ok(!!marker._popup._map, 'popup opens again');
  assert.equal(Ember.$(marker._popup._contentNode).text().trim(), 'Popup content', 'popup content set');

});

test('popup closes when layer is destroyed', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('isVisible', true);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#if isVisible}}
        {{#marker-layer location=markerCenter popupOpen=true}}
          Popup content
        {{/marker-layer}}
      {{/if}}
    {{/leaflet-map}}
  `);

  let map = layer._map;
  assert.ok(!!map._popup, 'popup starts open');
  assert.equal(Ember.$(map._popup._contentNode).text().trim(), 'Popup content', 'popup content set');

  this.set('isVisible', false);

  assert.equal(map._popup, null, 'popup closed');
});

test('popup closes with yielded action', function(assert) {

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=center popupOpen=popupOpen as |closePopup|}}
        <span id="closeEl" onclick={{closePopup}}>Popup content</span>
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  Ember.run(() => {
    marker._layer.fire('click', { latlng: locations.nyc });
  });

  assert.ok(!!marker._popup._map, 'popup opened');

  Ember.run(() => {
    this.$('#closeEl').click();
  });

  let map = layer._map;
  assert.equal(map._popup, null, 'popup closed');
});

test('popupOptions hash', function(assert) {
  this.set('markerCenter', locations.nyc);
  this.set('popupOptions', { className: 'foo' });
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter draggable=draggable popupOptions=popupOptions}}
        Popup Content
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._popup.options.className, 'foo', 'popup class set');
});
