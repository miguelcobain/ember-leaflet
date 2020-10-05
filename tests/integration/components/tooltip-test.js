import { computed, defineProperty } from '@ember/object';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import PolylineLayerComponent from 'ember-leaflet/components/polyline-layer';
import locations from '../../helpers/locations';
/* global L */
import isLeaflet07 from '../../helpers/is-leaflet-0.7';

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker, arrayPath;

if (!isLeaflet07(L)) {
  module('Integration | Component | tooltip layer', function (hooks) {
    setupRenderingTest(hooks);
    setupCustomAssertions(hooks);

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

    test('tooltip works', async function (assert) {
      this.set('markerCenter', locations.nyc);

      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
          <layers.marker @location={{this.markerCenter}} as |marker|>
            <marker.tooltip>
              Tooltip content
            </marker.tooltip>
          </layers.marker>
        </LeafletMap>
      `);

      assert.equal(marker._layer._tooltip._map, null, 'tooltip not added until opened');

      run(() => {
        marker._layer.fire('mouseover', { latlng: locations.nyc });
      });

      await settled();

      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.dom(marker._layer._tooltip._contentNode).hasText('Tooltip content', 'tooltip content set');
    });

    test('tooltip works with permanent=true', async function (assert) {
      this.set('markerCenter', locations.nyc);

      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
          <layers.marker @location={{this.markerCenter}} as |marker|>
            <marker.tooltip @permanent={{true}}>
              Tooltip content
            </marker.tooltip>
          </layers.marker>
        </LeafletMap>
      `);

      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.dom(marker._layer._tooltip._contentNode).hasText('Tooltip content', 'tooltip content set');
    });

    test("tooltip content isn't rendered until it is opened (lazy tooltips)", async function (assert) {
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
            <marker.tooltip>
              {{this.computedProperty}}
            </marker.tooltip>
          </layers.marker>
        </LeafletMap>
      `);

      assert.equal(marker._layer._tooltip._map, null, 'tooltip not added until opened');

      assert.ok(!didRun, 'computed property did not run');

      run(() => {
        marker._layer.fire('mouseover', { latlng: locations.nyc });
      });

      await settled();

      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.ok(didRun, 'computed property did run');
    });

    test('tooltip closes when layer is destroyed', async function (assert) {
      this.set('markerCenter', locations.nyc);
      this.set('isVisible', true);

      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
          {{#if this.isVisible}}
            <layers.marker @location={{this.markerCenter}} as |marker|>
              <marker.tooltip>
                Tooltip content
              </marker.tooltip>
            </layers.marker>
          {{/if}}
        </LeafletMap>
      `);

      run(() => {
        marker._layer.fire('mouseover', { latlng: locations.nyc });
      });

      await settled();

      let tooltip = marker._layer._tooltip;
      assert.ok(!!tooltip._map, 'tooltip opened');
      assert.dom(tooltip._contentNode).hasText('Tooltip content', 'tooltip content set');

      this.set('isVisible', false);

      assert.equal(tooltip._map, null, 'tooltip closed');
    });

    test('tooltip options work', async function (assert) {
      this.set('markerCenter', locations.nyc);
      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
          <layers.marker @location={{this.markerCenter}} @draggable={{this.draggable}} as |marker|>
            <marker.tooltip @className="foo">
              Tooltip Content
            </marker.tooltip>
          </layers.marker>
        </LeafletMap>
      `);

      assert.equal(marker._layer._tooltip.options.className, 'foo', 'tooltip class set');
    });

    test('tooltip options within path layers', async function (assert) {
      this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
          <layers.polyline @locations={{this.locations}} as |polyline|>
            <polyline.tooltip @className="exists">
              Tooltip content
            </polyline.tooltip>
          </layers.polyline>
        </LeafletMap>
      `);

      assert.equal(arrayPath._layer._tooltip.options.className, 'exists', 'tooltip class set on array-path');
    });
  });
}
