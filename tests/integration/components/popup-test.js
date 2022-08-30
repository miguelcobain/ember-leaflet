import { computed, defineProperty } from '@ember/object';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import PolylineLayerComponent from 'ember-leaflet/components/polyline-layer';
import locations from '../../helpers/locations';
/* global L */
import isLeaflet07 from '../../helpers/is-leaflet-0.7';

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker, arrayPath;

module('Integration | Component | popup layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'component:marker-layer',
      class extends MarkerLayerComponent {
        constructor() {
          super(...arguments);
          marker = this;
        }
      }
    );

    this.owner.register(
      'component:polyline-layer',
      class extends PolylineLayerComponent {
        constructor() {
          super(...arguments);
          arrayPath = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('popup works', async function (assert) {
    this.set('markerCenter', locations.nyc);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} as |marker|>
          <marker.popup>
            Popup content
          </marker.popup>
        </layers.marker>
      </LeafletMap>
    `);

    assert.strictEqual(marker._layer._popup._map, undefined, 'popup not added until opened');

    run(() => {
      marker._layer.fire('click', { latlng: locations.nyc });
    });

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opened');
    assert.dom(marker._layer._popup._contentNode).hasText('Popup content', 'popup content set');
  });

  test("popup content isn't rendered until it is opened (lazy popups)", async function (assert) {
    let didRun = false;

    this.set('markerCenter', locations.nyc);
    defineProperty(
      this,
      'computedProperty',
      computed(function () {
        didRun = true;
        return 'text';
      })
    );

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} as |marker|>
          <marker.popup>
            {{this.computedProperty}}
          </marker.popup>
        </layers.marker>
      </LeafletMap>
    `);

    assert.strictEqual(marker._layer._popup._map, undefined, 'popup not added until opened');

    assert.notOk(didRun, 'computed property did not run');

    run(() => {
      marker._layer.fire('click', { latlng: locations.nyc });
    });

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opened');
    assert.ok(didRun, 'computed property did run');
  });

  test('popup opens based on popupOpen', async function (assert) {
    this.set('markerCenter', locations.nyc);
    this.set('popupOpen', true);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} as |marker|>
          <marker.popup @popupOpen={{this.popupOpen}}>
            Popup content
          </marker.popup>
        </layers.marker>
      </LeafletMap>
    `);

    assert.ok(!!marker._layer._popup._map, 'popup starts open');
    assert.dom(marker._layer._popup._contentNode).hasText('Popup content', 'popup content set');

    run(() => {
      this.set('popupOpen', false);
    });

    assert.strictEqual(marker._layer._popup._map, null, 'popup closed');

    run(() => {
      this.set('popupOpen', true);
    });

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opens again');
    assert.dom(marker._layer._popup._contentNode).hasText('Popup content', 'popup content set');
  });

  test('popup closes when layer is destroyed', async function (assert) {
    this.set('markerCenter', locations.nyc);
    this.set('isVisible', true);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        {{#if this.isVisible}}
          <layers.marker @location={{this.markerCenter}} as |marker|>
            <marker.popup @popupOpen={{true}}>
              Popup content
            </marker.popup>
          </layers.marker>
        {{/if}}
      </LeafletMap>
    `);

    let map = marker._layer._map;
    assert.ok(!!map._popup, 'popup starts open');
    assert.dom(map._popup._contentNode).hasText('Popup content', 'popup content set');

    this.set('isVisible', false);

    assert.false(map._popup.isOpen(), 'popup closed');
  });

  test('popup closes with yielded action', async function (assert) {
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.center}} as |marker|>
          <marker.popup @popupOpen={{this.popupOpen}} as |closePopup|>
            <span id="closeEl" {{on "click" closePopup}} role="button">Popup content</span>
          </marker.popup>
        </layers.marker>
      </LeafletMap>
    `);

    run(() => {
      marker._layer.fire('click', { latlng: locations.nyc });
    });

    await settled();

    assert.ok(!!marker._layer._popup._map, 'popup opened');

    await click('#closeEl');

    let map = marker._layer._map;
    assert.false(map._popup.isOpen(), 'popup closed');
  });

  test('popup options work', async function (assert) {
    this.set('markerCenter', locations.nyc);
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @draggable={{this.draggable}} as |marker|>
          <marker.popup @className="foo">
            Popup Content
          </marker.popup>
        </layers.marker>
      </LeafletMap>
    `);

    assert.strictEqual(marker._layer._popup.options.className, 'foo', 'popup class set');
  });

  test('popup options within path layers', async function (assert) {
    this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.polyline @locations={{this.locations}} as |polyline|>
          <polyline.popup @className="exists">
            Popup Content
          </polyline.popup>
        </layers.polyline>
      </LeafletMap>
    `);

    assert.strictEqual(arrayPath._layer._popup.options.className, 'exists', 'popup class set on array-path');
  });

  (isLeaflet07(L) ? skip : test)('popup is compatible with markerClusterLayer', async function (assert) {
    this.set('markerCenter', locations.nyc);

    await render(hbs`
      <LeafletMap @maxZoom={{16}} @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker-cluster as |cluster|>
          <cluster.marker @location={{this.markerCenter}} as |marker|>
            <marker.popup>
              Popup content
            </marker.popup>
          </cluster.marker>

          <cluster.marker @location={{this.markerCenter}} as |marker|>
            <marker.popup>
              Popup content
            </marker.popup>
          </cluster.marker>
        </layers.marker-cluster>
      </LeafletMap>
    `);

    assert.ok(true);
  });
});
