import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { assertionInjector, assertionCleanup } from '../../assertions';
import hasEmberVersion from 'ember-test-helpers/has-ember-version';
import MarkerLayerComponent from 'ember-leaflet/components/marker-layer';
import locations from '../../helpers/locations';
/* globals L */

//Needed to silence leaflet autodetection error
L.Icon.Default.imagePath = 'some-path';

let marker;

moduleForComponent('marker-layer', 'Integration | Component | marker layer', {
  integration: true,
  beforeEach() {
    assertionInjector();

    this.register('component:marker-layer', MarkerLayerComponent.extend({
      init() {
        this._super(...arguments);
        marker = this;
      }
    }));

    this.set('center', locations.nyc);
    this.set('zoom', 13);
  },
  afterEach() {
    assertionCleanup();
  }
});

test('update marker layer using leafletProperties', function(assert) {
  this.set('markerCenter', locations.nyc);
  this.set('opacity', 0.2);
  this.set('zIndexOffset', 13);
  this.set('icon', L.divIcon({className: 'my-div-icon'}));

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter opacity=opacity zIndexOffset=zIndexOffset icon=icon}}
    {{/leaflet-map}}
  `);

  //pre-conditions
  assert.locationsEqual(marker._layer.getLatLng(), locations.nyc);
  assert.equal(marker._layer.options.opacity, 0.2);
  assert.equal(marker._layer.options.zIndexOffset, 13);
  assert.equal(marker._layer.options.icon, this.get('icon'));

  this.set('markerCenter', locations.sf);
  this.set('opacity', 0.8);
  this.set('zIndexOffset', 2);
  this.set('icon', L.divIcon({className: 'another-div-icon'}));

  assert.locationsEqual(marker._layer.getLatLng(), locations.sf);
  assert.equal(marker._layer.options.opacity, 0.8);
  assert.equal(marker._layer.options.zIndexOffset, 2);
  assert.equal(marker._layer.options.icon, this.get('icon'));
});

test('marker sends actions for events', function(assert) {
  assert.expect(1);

  this.set('moveAction', () => {
    assert.ok(true, 'move fired');
  });

  this.set('markerCenter', locations.nyc);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter onMove=(action moveAction)}}
    {{/leaflet-map}}
  `);

  this.set('markerCenter', locations.paris);
});

test('marker is created with enabled dragging', function(assert) {

  this.set('markerCenter', locations.nyc);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter draggable=true}}
    {{/leaflet-map}}
  `);

   assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');
});

test('marker updates dragging', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('draggable', true);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer location=markerCenter draggable=draggable}}
    {{/leaflet-map}}
  `);

    //pre-conditions
   assert.ok(marker._layer.dragging.enabled(), 'marker dragging enabled');

   this.set('draggable', false);

   assert.equal(marker._layer.dragging.enabled(), false, 'marker dragging disabled');
});

if (hasEmberVersion(2,3)) {
  // do stuff in Ember 2.3+
  test('marker works as contextual component', function(assert) {

    this.set('markerCenter', locations.nyc);

    this.render(hbs`
      {{#leaflet-map zoom=zoom center=center as |layers|}}
        {{layers.marker location=markerCenter}}
      {{/leaflet-map}}
    `);

     assert.ok(marker._layer, 'marker was created');
  });
}

test('using icons from icon helper works', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('currentIconUrl', 'custom-url.png');
  this.set('currentSize', 12);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer
        location=markerCenter
        icon=(icon
          iconUrl=currentIconUrl
          iconSize=(point currentSize currentSize)
        )}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._layer.options.icon.options.iconUrl, 'custom-url.png');
  assert.equal(marker._layer.options.icon.options.iconSize.x, 12);
  assert.equal(marker._layer.options.icon.options.iconSize.y, 12);

  // Let's make sure an icon recomputes with a bound param changes
  this.set('currentIconUrl', 'another-custom-url.png');
  this.set('currentSize', 21);
  assert.equal(marker._layer.options.icon.options.iconUrl, 'another-custom-url.png');
  assert.equal(marker._layer.options.icon.options.iconSize.x, 21);
  assert.equal(marker._layer.options.icon.options.iconSize.y, 21);
});

test('using icons from div-icon helper works', function(assert) {

  this.set('markerCenter', locations.nyc);
  this.set('iconContent', '<h1>First title!</h1>');
  this.set('currentSize', 12);

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{marker-layer
        location=markerCenter
        icon=(div-icon
          html=iconContent
          iconSize=(point currentSize currentSize)
        )}}
    {{/leaflet-map}}
  `);

  assert.equal(marker._layer.options.icon.options.html, '<h1>First title!</h1>');
  assert.equal(marker._layer.options.icon.options.iconSize.x, 12);
  assert.equal(marker._layer.options.icon.options.iconSize.y, 12);

  // Let's make sure an icon recomputes with a bound param changes
  this.set('iconContent', '<h1>Second title!</h1>');
  this.set('currentSize', 21);
  assert.equal(marker._layer.options.icon.options.html, '<h1>Second title!</h1>');
  assert.equal(marker._layer.options.icon.options.iconSize.x, 21);
  assert.equal(marker._layer.options.icon.options.iconSize.y, 21);
});