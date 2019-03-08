import { computed, defineProperty } from '@ember/object';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertionInjector,
  assertionCleanup
} from '../../assertions';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import ArrayPathLayerComponent from 'ember-leaflet/components/array-path-layer';
import locations from '../../helpers/locations';
/* global L */
import isLeaflet07 from '../../helpers/is-leaflet-0.7';

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker, arrayPath;

module('Integration | Component | popup layer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    assertionInjector();

    this.owner.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        marker = this;
      }
    }));

    this.owner.register('component:custom-array-path-layer', ArrayPathLayerComponent.extend({
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
  });

  hooks.afterEach(function() {
    assertionCleanup();
  });

  test('popup works', async function(assert) {
    this.set('markerCenter', locations.nyc);

    await render(hbs`
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

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opened');
    assert.dom(marker._layer._popup._contentNode).hasText('Popup content', 'popup content set');
  });

  test('popup content isn\'t rendered until it is opened (lazy popups)', async function(assert) {
    let didRun = false;

    this.set('markerCenter', locations.nyc);
    defineProperty(this, 'computedProperty', computed(function() {
      didRun = true;
    }));

    await render(hbs`
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

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opened');
    assert.ok(didRun, 'computed property did run');
  });

  test('popup opens based on popupOpen', async function(assert) {

    this.set('markerCenter', locations.nyc);
    this.set('popupOpen', true);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{#marker-layer location=markerCenter}}
          {{#popup-layer popupOpen=popupOpen}}
            Popup content
          {{/popup-layer}}
        {{/marker-layer}}
      {{/leaflet-map}}
    `);

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup starts open');
    assert.dom(marker._layer._popup._contentNode).hasText('Popup content', 'popup content set');

    run(() => {
      this.set('popupOpen', false);
    });

    assert.equal(marker._layer._popup._map, null, 'popup closed');

    run(() => {
      this.set('popupOpen', true);
    });

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opens again');
    assert.dom(marker._layer._popup._contentNode).hasText('Popup content', 'popup content set');
  });

  test('popup closes when layer is destroyed', async function(assert) {

    this.set('markerCenter', locations.nyc);
    this.set('isVisible', true);

    await render(hbs`
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

    await settled();

    let map = marker._layer._map;
    assert.ok(!!map._popup, 'popup starts open');
    assert.dom(map._popup._contentNode).hasText('Popup content', 'popup content set');

    this.set('isVisible', false);

    assert.equal(map._popup, null, 'popup closed');
  });

  test('popup closes with yielded action', async function(assert) {

    await render(hbs`
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

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opened');

    await click('#closeEl');

    let map = marker._layer._map;
    assert.equal(map._popup, null, 'popup closed');
  });

  test('popup options work', async function(assert) {
    this.set('markerCenter', locations.nyc);
    await render(hbs`
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

  test('popup options within path layers', async function(assert) {
    this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

    await render(hbs`
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

  (isLeaflet07(L) ? skip : test)('popup is compatible with markerClusterLayer', async function(assert) {
    this.set('markerCenter', locations.nyc);

    await render(hbs`
      {{#leaflet-map maxZoom=16 zoom=zoom center=center}}
        {{#marker-cluster-layer}}
          {{#marker-layer location=markerCenter as |marker|}}
            {{#marker.popup}}
              Popup content
            {{/marker.popup}}
          {{/marker-layer}}
          {{#marker-layer location=markerCenter as |marker|}}
            {{#marker.popup}}
              Popup content
            {{/marker.popup}}
          {{/marker-layer}}
        {{/marker-cluster-layer}}
      {{/leaflet-map}}
    `);

    assert.ok(true);
  });
});
