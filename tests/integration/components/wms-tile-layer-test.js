import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import WmsTileLayerComponent from 'ember-leaflet/components/wms-tile-layer';
import locations from '../../helpers/locations';

let tile;

moduleForComponent('wms-tile-layer', 'Integration | Component | wms tile layer', {
  integration: true,
  beforeEach() {
    this.register('component:wms-tile-layer', WmsTileLayerComponent.extend({
      init() {
        this._super(...arguments);
        tile = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  }
});

test('wms parameters are set', function(assert) {

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{wms-tile-layer url="an-url" layers="layers" styles="styles"}}
    {{/leaflet-map}}
  `);

  assert.equal(tile._layer._url, 'an-url');
  assert.equal(tile._layer.wmsParams.layers, 'layers');
  assert.equal(tile._layer.wmsParams.styles, 'styles');

});
