import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import locations from '../../helpers/locations';
/* globals L */

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker;

module('Integration | Component | marker layer', function(hooks) {
  setupRenderingTest(hooks);
  setupCustomAssertions(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        marker = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('update marker layer using leafletProperties', async function(assert) {
    this.set('markerCenter', locations.nyc);
    this.set('opacity', 0.2);
    this.set('zIndexOffset', 13);
    this.set('icon', L.divIcon({ className: 'my-div-icon' }));

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer location=markerCenter opacity=opacity zIndexOffset=zIndexOffset icon=icon}}
      {{/leaflet-map}}
    `);

    // pre-conditions
    assert.locationsEqual(marker._layer.getLatLng(), locations.nyc);
    assert.equal(marker._layer.options.opacity, 0.2);
    assert.equal(marker._layer.options.zIndexOffset, 13);
    assert.equal(marker._layer.options.icon, this.get('icon'));

    this.set('markerCenter', locations.sf);
    this.set('opacity', 0.8);
    this.set('zIndexOffset', 2);
    this.set('icon', L.divIcon({ className: 'another-div-icon' }));

    assert.locationsEqual(marker._layer.getLatLng(), locations.sf);
    assert.equal(marker._layer.options.opacity, 0.8);
    assert.equal(marker._layer.options.zIndexOffset, 2);
    assert.equal(marker._layer.options.icon, this.get('icon'));
  });

  test('marker sends actions for events', async function(assert) {
    assert.expect(1);

    this.set('moveAction', () => {
      assert.ok(true, 'move fired');
    });

    this.set('markerCenter', locations.nyc);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer location=markerCenter onMove=(action moveAction)}}
      {{/leaflet-map}}
    `);

    this.set('markerCenter', locations.paris);
  });

  test('marker is created with enabled dragging', async function(assert) {

    this.set('markerCenter', locations.nyc);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer location=markerCenter draggable=true}}
      {{/leaflet-map}}
    `);

    assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');
  });

  test('marker updates dragging', async function(assert) {

    this.set('markerCenter', locations.nyc);
    this.set('draggable', true);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer location=markerCenter draggable=draggable}}
      {{/leaflet-map}}
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
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer location=markerCenter draggable=draggable icon=currentIcon}}
      {{/leaflet-map}}
    `);

    // pre-conditions
    assert.equal(marker._layer.dragging.enabled(), true, 'marker dragging enabled');

    this.set('draggable', false);
    assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging disabled');

    this.set('currentIcon', icon2);
    assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging is still disabled');
  });

  if (hasEmberVersion(2, 3)) {
    // do stuff in Ember 2.3+
    test('marker works as contextual component', async function(assert) {

      this.set('markerCenter', locations.nyc);

      await render(hbs`
        {{#leaflet-map zoom=zoom center=center as |layers|}}
          {{layers.marker location=markerCenter}}
        {{/leaflet-map}}
      `);

      assert.ok(marker._layer, 'marker was created');
    });
  }

  test('using icons from icon helper works', async function(assert) {

    this.set('markerCenter', locations.nyc);
    this.set('currentIconUrl', 'custom-url.png');
    this.set('currentSize', 12);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer
          location=markerCenter
          icon=(icon
            iconUrl=currentIconUrl
            iconSize=(point currentSize currentSize)
          )}}
      {{/leaflet-map}}
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
      {{#leaflet-map zoom=zoom center=center}}
        {{marker-layer
          location=markerCenter
          icon=(div-icon
            html=iconContent
            iconSize=(point currentSize currentSize)
          )}}
      {{/leaflet-map}}
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
