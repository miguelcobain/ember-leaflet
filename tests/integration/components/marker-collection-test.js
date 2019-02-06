import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertionInjector,
  assertionCleanup
} from '../../assertions';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import locations from '../../helpers/locations';
/* global L */

// Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let markersInitCount, createLayersCount, destroyLayersCount, markers;

module('Integration | Component | marker layer collection', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    assertionInjector();

    this.owner.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        markersInitCount++;
        markers.push(this);
      },
      didInsertParent() {
        this._super(...arguments);
        createLayersCount++;
      },
      willDestroyParent() {
        this._super(...arguments);
        destroyLayersCount++;
      }
    }));

    markersInitCount = 0;
    createLayersCount = 0;
    destroyLayersCount = 0;
    markers = [];

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  hooks.afterEach(function() {
    assertionCleanup();
  });

  let restaurant1 = { location: locations.nyc };
  let restaurant2 = { location: locations.chicago };
  let restaurant3 = { location: locations.sf };
  let restaurant4 = { location: locations.london };
  let restaurant5 = { location: locations.paris };

  test('layers works within each', async function(assert) {
    this.set('markers', [
      restaurant1,
      restaurant2,
      restaurant3,
      restaurant4
    ]);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{#each markers as |m|}}
          {{marker-layer location=m.location}}
        {{/each}}
      {{/leaflet-map}}
    `);

    // pre-conditions
    assert.equal(markersInitCount, 4);
    assert.equal(createLayersCount, 4);
    assert.equal(destroyLayersCount, 0);

    this.set('markers', [
      restaurant1,
      restaurant5, // only one item has changed, in a new
      restaurant3,
      restaurant4
    ]);

    // only one leaflet marker was created
    // great for performance
    assert.equal(markersInitCount, 5);
    assert.equal(createLayersCount, 5);
    assert.equal(destroyLayersCount, 1); // and only one was destroyed
  });

  test('popup remains open when another layer is destroyed', async function(assert) {

    this.set('markers', [
      restaurant1,
      restaurant2,
      restaurant3,
      restaurant4
    ]);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{#each markers as |m|}}
          {{#marker-layer location=m.location}}
            {{#popup-layer}}
              Popup content
            {{/popup-layer}}
          {{/marker-layer}}
        {{/each}}
      {{/leaflet-map}}
    `);

    // pre-conditions
    assert.equal(markersInitCount, 4);
    assert.equal(createLayersCount, 4);
    assert.equal(destroyLayersCount, 0);

    assert.equal(markers[2]._layer._popup._map, null, 'popup not added until opened');

    run(() => {
      markers[2]._layer.fire('click', { latlng: locations.nyc });
    });

    await settled();

    assert.ok(!!markers[2]._layer._popup._map, 'marker added to map');
    assert.dom(markers[2]._layer._popup._contentNode).hasText('Popup content', 'popup content set');

    this.set('markers', [
      restaurant1,
      restaurant2,
      restaurant3
    ]);

    assert.equal(markersInitCount, 4);
    assert.equal(createLayersCount, 4);
    assert.equal(destroyLayersCount, 1);

    assert.ok(!!markers[2]._layer._popup._map, 'marker added to map');
    assert.dom(markers[2]._layer._popup._contentNode).hasText('Popup content', 'popup content set');
  });
});
