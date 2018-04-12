import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import WmsTileLayerComponent from 'ember-leaflet/components/wms-tile-layer';
import locations from '../../helpers/locations';

let tile;

module('Integration | Component | wms tile layer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:wms-tile-layer', WmsTileLayerComponent.extend({
      init() {
        this._super(...arguments);
        tile = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  });

  test('wms parameters are set', async function(assert) {

    await render(hbs`
      {{#leaflet-map zoom=zoom center=center}}
        {{wms-tile-layer url="an-url" layers="layers" styles="styles"}}
      {{/leaflet-map}}
    `);

    assert.equal(tile._layer._url, 'an-url');
    assert.equal(tile._layer.wmsParams.layers, 'layers');
    assert.equal(tile._layer.wmsParams.styles, 'styles');

  });
});
