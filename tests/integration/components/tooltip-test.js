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

if (!/0.7.\d+/.test(L.version)) {
  moduleForComponent('marker-layer', 'Integration | Component | tooltip layer', {
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

  test('tooltip works', function(assert) {
    this.set('markerCenter', locations.nyc);

    this.render(hbs`
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

    return wait().then(() => {
      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.equal(Ember.$(marker._layer._tooltip._contentNode).text().trim(), 'Tooltip content', 'tooltip content set');
    });
  });

  test('tooltip works with permanent=true', function(assert) {
    this.set('markerCenter', locations.nyc);

    this.render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{#marker-layer location=markerCenter}}
          {{#tooltip-layer permanent=true}}
            Tooltip content
          {{/tooltip-layer}}
        {{/marker-layer}}
      {{/leaflet-map}}
    `);

    assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
    assert.equal(Ember.$(marker._layer._tooltip._contentNode).text().trim(), 'Tooltip content', 'tooltip content set');
  });

  test('tooltip content isn\'t rendered until it is opened (lazy tooltips)', function(assert) {
    var didRun = false;

    this.set('markerCenter', locations.nyc);
    this.set('computedProperty', computed(function() {
      didRun = true;
    }));

    this.render(hbs`
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

    return wait().then(() => {
      assert.ok(!!marker._layer._tooltip._map, 'tooltip opened');
      assert.ok(didRun, 'computed property did run');
    });
  });

  test('tooltip closes when layer is destroyed', function(assert) {

    this.set('markerCenter', locations.nyc);
    this.set('isVisible', true);

    this.render(hbs`
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

    return wait().then(() => {
      let tooltip = marker._layer._tooltip;
      assert.ok(!!tooltip._map, 'tooltip opened');
      assert.equal(Ember.$(tooltip._contentNode).text().trim(), 'Tooltip content', 'tooltip content set');

      this.set('isVisible', false);

      assert.equal(tooltip._map, null, 'tooltip closed');
    });
  });

  test('tooltip options work', function(assert) {
    this.set('markerCenter', locations.nyc);
    this.render(hbs`
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

  test('tooltip options within path layers', function(assert) {
    this.set('locations', A([locations.chicago, locations.nyc, locations.sf]));

    this.render(hbs`
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
}