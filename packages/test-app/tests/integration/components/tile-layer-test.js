import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import TileLayerComponent from 'ember-leaflet/components/tile-layer';
import locations from '../../helpers/locations';

let tile;

module('Integration | Component | tile layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'component:tile-layer',
      class extends TileLayerComponent {
        constructor() {
          super(...arguments);
          tile = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('create and update tile layer using leafletProperties', async function (assert) {
    this.set('tileUrl', 'http://{s}.tile.osm.org/{z}/{x}/{y}.png');
    this.set('zIndex', 13);
    this.set('opacity', 0.2);
    this.set('subdomains', ['123']);

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.tile @url={{this.tileUrl}} @opacity={{this.opacity}} @zIndex={{this.zIndex}} @subdomains={{this.subdomains}}/>
      </LeafletMap>
    `);

    assert.strictEqual(
      tile._layer._url,
      'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    );
    assert.strictEqual(tile._layer.options.opacity, 0.2);
    assert.strictEqual(tile._layer.options.zIndex, 13);
    assert.deepEqual(tile._layer.options.subdomains, ['123']);

    this.set(
      'tileUrl',
      'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
    );
    this.set('zIndex', 2);
    this.set('opacity', 0.8);
    await settled();

    assert.strictEqual(
      tile._layer._url,
      'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
    );
    assert.strictEqual(tile._layer.options.opacity, 0.8);
    assert.strictEqual(tile._layer.options.zIndex, 2);
  });

  test('tile layer sends actions for events', async function (assert) {
    assert.expect(1);

    this.set('loadingAction', () => {
      assert.ok(true, 'loading fired');
    });

    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.tile @url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" @onLoading={{this.loadingAction}}/>
      </LeafletMap>
    `);
  });
});
