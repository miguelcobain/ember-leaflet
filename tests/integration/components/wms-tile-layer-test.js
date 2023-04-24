import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import WmsTileLayerComponent from 'ember-leaflet/components/wms-tile-layer';
import locations from '../../helpers/locations';

let tile;

// monkey patch `didCreateLayer` method to get a reference to the instance
let oldDidCreateLayer = WmsTileLayerComponent.prototype.didCreateLayer;
WmsTileLayerComponent.prototype.didCreateLayer = function () {
  tile = this;
  return oldDidCreateLayer.apply(this, arguments);
};

module('Integration | Component | wms tile layer', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('wms parameters are set', async function (assert) {
    await render(hbs`<LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
  <layers.wms-tile @url='an-url' @layers='layers' @styles='styles' />
</LeafletMap>`);

    assert.strictEqual(tile._layer._url, 'an-url');
    assert.strictEqual(tile._layer.wmsParams.layers, 'layers');
    assert.strictEqual(tile._layer.wmsParams.styles, 'styles');
  });
});
