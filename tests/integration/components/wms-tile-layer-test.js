import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';

import WmsTileLayer from 'ember-leaflet/components/wms-tile-layer';

import locations from '../../helpers/locations';

let tile;

module('Integration | Component | wms tile layer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register(
      'component:wms-tile-layer',
      class extends WmsTileLayer {
        constructor() {
          super(...arguments);
          tile = this;
        }
      }
    );

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('wms parameters are set', async function(assert) {
    await render(hbs`
      <LeafletMap @zoom={{this.zoom}} @center={{this.center}} as |layers|>
        <layers.wms-tile @url="an-url" @layers="layers" @styles="styles"/>
      </LeafletMap>
    `);

    assert.equal(tile._layer._url, 'an-url');
    assert.equal(tile._layer.wmsParams.layers, 'layers');
    assert.equal(tile._layer.wmsParams.styles, 'styles');
  });
});
