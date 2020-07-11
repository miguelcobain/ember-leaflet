import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import hbs from 'htmlbars-inline-precompile';

import MarkerLayer from 'ember-leaflet/components/marker-layer';

import locations from '../../helpers/locations';
/* globals L */

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker;

module('Integration | Component | marker layer', function(hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function() {
    this.owner.register(
      'component:marker-layer',
      class extends MarkerLayer {
        constructor() {
          super(...arguments);
          marker = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('update marker layer using leafletDescriptors', async function(assert) {
    this.set('markerCenter', locations.nyc);
    this.set('opacity', 0.2);
    this.set('zIndexOffset', 13);
    this.set('icon', L.divIcon({ className: 'my-div-icon' }));

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @opacity={{this.opacity}} @zIndexOffset={{this.zIndexOffset}} @icon={{this.icon}}/>
      </LeafletMap>
    `);

    // pre-conditions
    assert.locationsEqual(marker._layer.getLatLng(), locations.nyc);
    assert.equal(marker._layer.options.opacity, 0.2);
    assert.equal(marker._layer.options.zIndexOffset, 13);
    assert.equal(marker._layer.options.icon, this.icon);

    this.set('markerCenter', locations.sf);
    this.set('opacity', 0.8);
    this.set('zIndexOffset', 2);
    this.set('icon', L.divIcon({ className: 'another-div-icon' }));

    assert.locationsEqual(marker._layer.getLatLng(), locations.sf);
    assert.equal(marker._layer.options.opacity, 0.8);
    assert.equal(marker._layer.options.zIndexOffset, 2);
    assert.equal(marker._layer.options.icon, this.icon);
  });

  test('marker sends actions for events', async function(assert) {
    assert.expect(1);

    this.set('moveAction', () => {
      assert.ok(true, 'move fired');
    });

    this.set('markerCenter', locations.nyc);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @onMove={{action this.moveAction}}/>
      </LeafletMap>
    `);

    this.set('markerCenter', locations.paris);
  });

  test('marker is created with enabled dragging', async function(assert) {
    this.set('markerCenter', locations.nyc);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @draggable={{true}}/>
      </LeafletMap>
    `);

    assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');
  });

  test('marker updates dragging', async function(assert) {
    this.set('markerCenter', locations.nyc);
    this.set('draggable', true);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @draggable={{this.draggable}}/>
      </LeafletMap>
    `);

    // pre-conditions
    assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');

    this.set('draggable', false);

    assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging disabled');
  });

  // Leaflet bug. More info: https://github.com/Leaflet/Leaflet/issues/3807
  test('marker retains draggability options when icon changes', async function(assert) {
    let icon1 = L.divIcon({ className: 'my-div-icon-1' });
    let icon2 = L.divIcon({ className: 'my-div-icon-2' });

    this.set('markerCenter', locations.nyc);
    this.set('draggable', true);
    this.set('currentIcon', icon1);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @draggable={{this.draggable}} @icon={{this.currentIcon}}/>
      </LeafletMap>
    `);

    // pre-conditions
    assert.equal(marker._layer.dragging.enabled(), true, 'marker dragging enabled');

    this.set('draggable', false);
    assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging disabled');

    this.set('currentIcon', icon2);
    assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging is still disabled');
  });

  test('using icons from icon helper works', async function(assert) {
    this.set('markerCenter', locations.nyc);
    this.set('currentIconUrl', 'custom-url.png');
    this.set('currentSize', 12);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @icon={{icon iconUrl=this.currentIconUrl iconSize=(point this.currentSize this.currentSize)}}/>
      </LeafletMap>
    `);

    assert.equal(marker._layer.options.icon.options.iconUrl, 'custom-url.png');
    assert.equal(marker._layer.options.icon.options.iconSize.x, 12);
    assert.equal(marker._layer.options.icon.options.iconSize.y, 12);

    // Let's make sure an icon recomputes with a bound param changes
    this.set('currentIconUrl', 'another-custom-url.png');
    this.set('currentSize', 21);
    assert.equal(marker._layer.options.icon.options.iconUrl, 'another-custom-url.png');
    assert.equal(marker._layer.options.icon.options.iconSize.x, 21);
    assert.equal(marker._layer.options.icon.options.iconSize.y, 21);
  });

  test('using icons from div-icon helper works', async function(assert) {
    this.set('markerCenter', locations.nyc);
    this.set('iconContent', '<h1>First title!</h1>');
    this.set('currentSize', 12);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.marker @location={{this.markerCenter}} @icon={{div-icon html=this.iconContent iconSize=(point this.currentSize this.currentSize)}}/>
      </LeafletMap>
    `);

    assert.equal(marker._layer.options.icon.options.html, '<h1>First title!</h1>');
    assert.equal(marker._layer.options.icon.options.iconSize.x, 12);
    assert.equal(marker._layer.options.icon.options.iconSize.y, 12);

    // Let's make sure an icon recomputes with a bound param changes
    this.set('iconContent', '<h1>Second title!</h1>');
    this.set('currentSize', 21);
    assert.equal(marker._layer.options.icon.options.html, '<h1>Second title!</h1>');
    assert.equal(marker._layer.options.icon.options.iconSize.x, 21);
    assert.equal(marker._layer.options.icon.options.iconSize.y, 21);
  });
});
