import { computed, defineProperty } from '@ember/object';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertionInjector,
  assertionCleanup
} from '../../assertions';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import ArrayPathLayerComponent from 'ember-leaflet/components/array-path-layer';
import locations from '../../helpers/locations';
/* global L */

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker, arrayPath;

if (!/0.7.\d+/.test(L.version)) {
  module('Integration | Component | tooltip layer', function(hooks) {
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

    test('tooltip works', async function(assert) {
      this.set('markerCenter', locations.nyc);

      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{#marker-layer location=markerCenter}}
            {{#tooltip-layer}}
              Tooltip content
            {{/tooltip-layer}}
          {{/marker-layer}}
        {{/leaflet-map}}
      `);

      assert.equal(marker._layer._tooltip._map, null, 'tooltip not added until opened');

      run(() => {
        marker._layer.fire('mouseover', { latlng: locations.nyc });
      });

      await settled();

      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.dom(marker._layer._tooltip._contentNode).hasText('Tooltip content', 'tooltip content set');
    });

    test('tooltip works with permanent=true', async function(assert) {
      this.set('markerCenter', locations.nyc);

      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{#marker-layer location=markerCenter}}
            {{#tooltip-layer permanent=true}}
              Tooltip content
            {{/tooltip-layer}}
          {{/marker-layer}}
        {{/leaflet-map}}
      `);

      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.dom(marker._layer._tooltip._contentNode).hasText('Tooltip content', 'tooltip content set');
    });

    test('tooltip content isn\'t rendered until it is opened (lazy tooltips)', async function(assert) {
      let didRun = false;

      this.set('markerCenter', locations.nyc);
      defineProperty(this, 'computedProperty', computed(function() {
        didRun = true;
      }));

      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{#marker-layer location=markerCenter}}
            {{#tooltip-layer}}
              {{computedProperty}}
            {{/tooltip-layer}}
          {{/marker-layer}}
        {{/leaflet-map}}
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

    test('tooltip closes when layer is destroyed', async function(assert) {

      this.set('markerCenter', locations.nyc);
      this.set('isVisible', true);

      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{#if isVisible}}
            {{#marker-layer location=markerCenter}}
              {{#tooltip-layer}}
                Tooltip content
              {{/tooltip-layer}}
            {{/marker-layer}}
          {{/if}}
        {{/leaflet-map}}
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

    test('tooltip options work', async function(assert) {
      this.set('markerCenter', locations.nyc);
      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{#marker-layer location=markerCenter draggable=draggable}}
            {{#tooltip-layer className="foo"}}
              Tooltip Content
            {{/tooltip-layer}}
          {{/marker-layer}}
        {{/leaflet-map}}
      `);

      assert.equal(marker._layer._tooltip.options.className, 'foo', 'tooltip class set');
    });

    test('tooltip options within path layers', async function(assert) {
      this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{#custom-array-path-layer locations=locations}}
            {{#tooltip-layer className="exists"}}
              Tooltip content
            {{/tooltip-layer}}
          {{/custom-array-path-layer}}
        {{/leaflet-map}}
      `);

      assert.equal(arrayPath._layer._tooltip.options.className, 'exists', 'tooltip class set on array-path');
    });

  });
}
