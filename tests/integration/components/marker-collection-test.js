import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import locations from '../../helpers/locations';
/* globals L */

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let markersInitCount = 0;
let createLayersCount = 0;

moduleForComponent('marker-layer', 'Integration | Component | marker layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        markersInitCount++;
      },
      createLayer() {
        createLayersCount++;
        return this._super(...arguments);
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

let restaurant1 = { location: locations.nyc };
let restaurant2 = { location: locations.chicago };
let restaurant3 = { location: locations.sf };
let restaurant4 = { location: locations.london };
let restaurant5 = { location: locations.paris };

test('layers works within each', function(assert) {
  this.set('markers', [
    restaurant1,
    restaurant2,
    restaurant3,
    restaurant4
  ]);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#each markers as |m|}}
        {{marker-layer location=m.location}}
      {{/each}}
    {{/leaflet-map}}
  `);

  //pre-conditions
  assert.equal(markersInitCount, 4);
  assert.equal(createLayersCount, 4);

  this.set('markers', [
    restaurant1,
    restaurant5, //only one item has changed, in a new
    restaurant3,
    restaurant4
  ]);

  //only one leaflet marker was created
  //great for performance
  assert.equal(markersInitCount, 5);
  assert.equal(createLayersCount, 5);
});
