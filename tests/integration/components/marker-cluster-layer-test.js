import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import MarkerClusterLayerComponent from 'ember-leaflet/components/marker-cluster-layer';
import locations from '../../helpers/locations';
/* globals L */

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let cluster;

moduleForComponent('marker-cluster-layer', 'Integration | Component | marker cluster layer', {
  integration: true,
  beforeEach() {

    this.register('component:marker-cluster-layer', MarkerClusterLayerComponent.extend({
      init() {
        this._super(...arguments);
        cluster = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
  }
});

test('it renders', function(assert) {
  this.set('markerCenter', locations.nyc);
  this.set('icon', L.divIcon({className: 'my-div-icon'}));

  // this maxZoom property here is for purpose. Otherwise
  // Leaflet.markercluster causes some weird behaviour on addlayer.
  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center maxZoom=25}}
      {{#marker-cluster-layer}}
        {{marker-layer location=markerCenter icon=icon}}
      {{/marker-cluster-layer}}
    {{/leaflet-map}}
    `);

  assert.equal(cluster._childLayers.length, 1);  
});
