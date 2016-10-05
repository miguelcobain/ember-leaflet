import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import wait from 'ember-test-helpers/wait';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import ArrayPathLayerComponent from 'ember-leaflet/components/array-path-layer';
import locations from '../../helpers/locations';
/* globals L */

const { computed, run, A } = Ember;

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker, arrayPath;

moduleForComponent('marker-layer', 'Integration | Component | popup layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        marker = this;
      }
    }));

    this.register('component:custom-array-path-layer', ArrayPathLayerComponent.extend({
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

test('popup works', function(assert) {
  this.set('markerCenter', locations.nyc);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter}}
        {{#popup-layer}}
          Popup content
        {{/popup-layer}}
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._layer._popup._map, null, 'popup not added until opened');

  run(() => {
    marker._layer.fire('click', { latlng: locations.nyc });
  });

  return wait().then(() => {
    assert.ok(!!marker._layer._popup._map, 'popup opened');
    assert.equal(Ember.$(marker._layer._popup._contentNode).text().trim(), 'Popup content', 'popup content set');
  });
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
        {{#popup-layer}}
          {{computedProperty}}
        {{/popup-layer}}
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._layer._popup._map, null, 'popup not added until opened');

  assert.ok(!didRun, 'computed property did not run');

  run(() => {
    marker._layer.fire('click', { latlng: locations.nyc });
  });

  return wait().then(() => {
    assert.ok(!!marker._layer._popup._map, 'popup opened');
    assert.ok(didRun, 'computed property did run');
  });
});

test('popup opens based on popupOpen', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('popupOpen', true);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter}}
        {{#popup-layer popupOpen=popupOpen}}
          Popup content
        {{/popup-layer}}
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  return wait().then(() => {
    assert.ok(!!marker._layer._popup._map, 'popup starts open');
    assert.equal(Ember.$(marker._layer._popup._contentNode).text().trim(), 'Popup content', 'popup content set');

    run(() => {
      this.set('popupOpen', false);
    });

    assert.equal(marker._layer._popup._map, null, 'popup closed');

    run(() => {
      this.set('popupOpen', true);
    });
    return wait();
  }).then(() => {
    assert.ok(!!marker._layer._popup._map, 'popup opens again');
    assert.equal(Ember.$(marker._layer._popup._contentNode).text().trim(), 'Popup content', 'popup content set');
  });
});

test('popup closes when layer is destroyed', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('isVisible', true);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#if isVisible}}
        {{#marker-layer location=markerCenter}}
          {{#popup-layer popupOpen=true}}
            Popup content
          {{/popup-layer}}
        {{/marker-layer}}
      {{/if}}
    {{/leaflet-map}}
  `);

  return wait().then(() => {
    let map = marker._layer._map;
    assert.ok(!!map._popup, 'popup starts open');
    assert.equal(Ember.$(map._popup._contentNode).text().trim(), 'Popup content', 'popup content set');

    this.set('isVisible', false);

    assert.equal(map._popup, null, 'popup closed');
  });
});

test('popup closes with yielded action', function(assert) {

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=center}}
        {{#popup-layer popupOpen=popupOpen as |closePopup|}}
          <span id="closeEl" onclick={{closePopup}}>Popup content</span>
        {{/popup-layer}}
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  run(() => {
    marker._layer.fire('click', { latlng: locations.nyc });
  });

  return wait().then(() => {
    assert.ok(!!marker._layer._popup._map, 'popup opened');

    run(() => {
      this.$('#closeEl').click();
    });

    return wait();
  }).then(() => {
    let map = marker._layer._map;
    assert.equal(map._popup, null, 'popup closed');
  });
});

test('popup options work', function(assert) {
  this.set('markerCenter', locations.nyc);
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#marker-layer location=markerCenter draggable=draggable}}
        {{#popup-layer className="foo"}}
          Popup Content
        {{/popup-layer}}
      {{/marker-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._layer._popup.options.className, 'foo', 'popup class set');
});

test('popup options within path layers', function(assert) {
  this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#custom-array-path-layer locations=locations}}
        {{#popup-layer className="exists"}}
          Popup content
        {{/popup-layer}}
      {{/custom-array-path-layer}}
    {{/leaflet-map}}
  `);

  assert.equal(arrayPath._layer._popup.options.className, 'exists', 'popup class set on array-path');
});
