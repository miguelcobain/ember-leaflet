import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import locations from '../../helpers/locations';

moduleForComponent('popup-layer', 'Integration | Component | popup layer', {
  integration: true,
  beforeEach() {
    this.set('center', locations.nyc);
    this.set('zoom', 13);

    this.set('popupLocation', locations.nyc);
    this.set('popupOpen', true);
  }
});

test('it fires the close event', function(assert) {

  this.render(hbs`
    {{#leaflet-map zoom=zoom center=center}}
      {{#if popupOpen}}
        {{#popup-layer
            location=popupLocation
            closePopup=(action (mut popupOpen) false)}}
          Popup text!
        {{/popup-layer}}
      {{/if}}
    {{/leaflet-map}}
  `);

  assert.equal(this.$('.leaflet-popup-content-wrapper').text().trim(), 'Popup text!');


  //test that the close button fires the action

  //note that Leaflet's close button only responds to real DOM events, so we
  //have to pick the actual DOM element out of the query and call click() on
  //that:

  let closeButtonDOMElement = this.$('.leaflet-popup-close-button')[0];

  closeButtonDOMElement.click();
  assert.equal(this.$('.leaflet-popup').length, 0);
  assert.equal(this.get('popupOpen'), false);

  this.set('popupOpen', true);
  assert.equal(this.$('.leaflet-popup-content-wrapper').text().trim(), 'Popup text!');

  // test that a background click also fires the action
  this.$('.leaflet-map-pane').click();
  assert.equal(this.$('.leaflet-popup').length, 0);
  assert.equal(this.get('popupOpen'), false);

});
