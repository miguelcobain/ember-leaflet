import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import TileLayerComponent from 'ember-leaflet/components/tile-layer';
/* global L */

let locations = {
  nyc: L.latLng(40.713282, -74.006978),
  sf: L.latLng(37.77493, -122.419415),
  chicago: L.latLng(41.878114, -87.629798),
  paris: L.latLng(48.856614, 2.352222),
  london: L.latLng(51.511214, -0.119824),
  newdelhi: L.latLng(28.635308, 77.22496)
};

let tile;

moduleForComponent('tile-layer', 'Integration | Component | tile layer', {
  integration: true,
  beforeEach() {
    this.register('component:tile-layer', TileLayerComponent.extend({
      init() {
        this._super(...arguments);
        tile = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  }
});

test('create and update tile layer using leafletProperties', function(assert) {
  this.set('tileUrl', 'http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  this.set('zIndex', 13);
  this.set('opacity', 0.2);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{tile-layer url=tileUrl opacity=opacity zIndex=zIndex}}
    {{/leaflet-map}}
  `);

  assert.equal(tile._layer._url, 'http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  assert.equal(tile._layer.options.opacity, 0.2);
  assert.equal(tile._layer.options.zIndex, 13);

  this.set('tileUrl', 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png');
  this.set('zIndex', 2);
  this.set('opacity', 0.8);

  assert.equal(tile._layer._url, 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png');
  assert.equal(tile._layer.options.opacity, 0.8);
  assert.equal(tile._layer.options.zIndex, 2);

});

test('tile layer sends actions for events', function(assert) {
  assert.expect(1);

  this.set('loadingAction', () => {
    assert.ok(true, 'loading fired');
  });

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" onLoading=(action loadingAction)}}
    {{/leaflet-map}}
  `);
});
