import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import TileLayerComponent from 'ember-leaflet/components/tile-layer';
import locations from '../../helpers/locations';

let tile;

module('Integration | Component | tile layer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:tile-layer', TileLayerComponent.extend({
      init() {
        this._super(...arguments);
        tile = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('create and update tile layer using leafletProperties', async function(assert) {
    this.set('tileUrl', 'http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    this.set('zIndex', 13);
    this.set('opacity', 0.2);
    this.set('subdomains', ['123']);

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{tile-layer url=tileUrl opacity=opacity zIndex=zIndex subdomains=subdomains}}
      {{/leaflet-map}}
    `);

    assert.equal(tile._layer._url, 'http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    assert.equal(tile._layer.options.opacity, 0.2);
    assert.equal(tile._layer.options.zIndex, 13);
    assert.deepEqual(tile._layer.options.subdomains, ['123']);

    this.set('tileUrl', 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png');
    this.set('zIndex', 2);
    this.set('opacity', 0.8);

    assert.equal(tile._layer._url, 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png');
    assert.equal(tile._layer.options.opacity, 0.8);
    assert.equal(tile._layer.options.zIndex, 2);

  });

  test('tile layer sends actions for events', async function(assert) {
    assert.expect(1);

    this.set('loadingAction', () => {
      assert.ok(true, 'loading fired');
    });

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" onLoading=(action loadingAction)}}
      {{/leaflet-map}}
    `);
  });
});
